// npx prisma generate --schema=prisma/schema.blog.prisma
// npx prisma db push --schema=prisma/schema.blog.prisma
// npx prisma db pull --schema=prisma/schema.blog.prisma
// npx prisma migrate dev --name add_updated_at_trigger --schema=prisma/schema.blog.prisma
// npx prisma migrate deploy  --schema=prisma/schema.blog.prisma

import { buildDynamicFilter } from "@/lib/helper/buildDynamicFilter";
import { blogDb, CmsDb } from "@/lib/prismaClients";
import { formatDateMoment } from "@/lib/utils";
import { NextResponse } from "next/server";
// import { VendorDetailSchema } from "@/lib/schema/vendorDetailSchema";
// import { z } from "zod";


export async function GET(request) {
      try {
            const { searchParams } = new URL(request.url);

            const page = Math.max(parseInt(searchParams.get("page"), 10) || 1, 1);
            const func = searchParams.get("func");
            if (func == 'list') {
                  
            }
            const limit = 20;
            const skip = (page - 1) * limit;
            const searchKey = searchParams.get("search_key")?.trim() || null;

            const searchableColumns = ["id", "title"];
            const dynamicFilter = buildDynamicFilter(searchKey, searchableColumns);

            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

            const [transformedData, totalCount] = await Promise.all([
                  blogDb.blog.findMany({
                        select: {
                              id: true,
                              ref_id: true,
                              title: true,
                              slug: true,
                              image: true,
                              image_alt: true,
                              status: true,
                              view: true,
                              added_by: true,
                              created_at: true,
                              comments: {
                                    select: {
                                          id: true,
                                          name: true,
                                          status: true,
                                          created_at: true,
                                    },
                                    where: {
                                          status: 0,
                                          created_at: {
                                                gte: thirtyDaysAgo,
                                          },
                                    }
                              },
                              author: {
                                    select: {
                                          id: true,
                                          name: true,
                                    },
                              },
                              category: {
                                    select: {
                                          title: true,
                                    },
                              },
                        },
                        where: dynamicFilter,
                        orderBy: { id: "desc" },
                        skip,
                        take: limit
                  }),
                  blogDb.blog.count({ where: dynamicFilter })
            ]);

            const flattenData = (data) => {
                  return data.map(blog => ({
                        id: blog.id,
                        ref_id: blog.ref_id,
                        title: blog.title,
                        slug: blog.slug,
                        image: blog.image,
                        image_alt: blog.image_alt,
                        status: blog.status,
                        view: blog.view,
                        added_by: blog.added_by.username,
                        userGroup: blog.added_by.user_group_id,
                        added_by_profile: blog.added_by.profile ?? null,
                        created_at: formatDateMoment(blog.created_at),
                        author_id: blog.author.id,
                        author_name: blog.author.name,
                        comments_count: blog.comments.length,
                        category_name: blog.category.title,
                  }));
            };

            const flattenedData = flattenData(transformedData);

            const COLUMN_NAMES = {
                  id: "ID",
                  title: "Title",
                  image: "Image",
                  status: "Status",
                  added_by: "Added By"
            };

            const columns = Object.keys(flattenedData[0] || {}).map((key) => ({
                  name: COLUMN_NAMES[key] || key.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase()),
                  uid: key,
                  sortable: true
            }));

            columns.push({ name: "Actions", uid: "actions" });

            const response = {
                  items: flattenedData,
                  INITIAL_VISIBLE_COLUMNS: ["id", "added_by", "title", "status", "created_at", "actions"],
                  columns: columns,
                  totalCount: totalCount,
            };

            const finalres = {
                  results: response,
                  next: page * limit < totalCount ? page + 1 : null,
            }
            return NextResponse.json(finalres);
      } catch (error) {
            await blogDb.$disconnect();
            await CmsDb.$disconnect();
            console.error("Error fetching details:", error);
            return NextResponse.json(
                  { error: error.message },
                  { status: 500 }
            );
      }
}