// npx prisma generate --schema=prisma/schema.blog.prisma
// npx prisma db push --schema=prisma/schema.blog.prisma
// npx prisma db pull --schema=prisma/schema.blog.prisma
// npx prisma migrate dev --name add_updated_at_trigger --schema=prisma/schema.blog.prisma
// npx prisma migrate deploy  --schema=prisma/schema.blog.prisma

import { buildDynamicFilter } from "@/lib/helper/buildDynamicFilter";
import { blogDb } from "@/lib/prismaClients";
import { formatDateMoment } from "@/lib/utils";
import { NextResponse } from "next/server";
// import { VendorDetailSchema } from "@/lib/schema/vendorDetailSchema";
// import { z } from "zod";


export async function GET(request) {
      try {
            const { searchParams } = new URL(request.url);

            const page = Math.max(parseInt(searchParams.get("page"), 10) || 1, 1);
            const limit = Math.min(parseInt(searchParams.get("limit"), 10) || 20, 100);
            const skip = (page - 1) * limit;

            const searchKey = searchParams.get("search_key");

            const searchableColumns = ["id", "title"];
            const dynamicFilter = buildDynamicFilter(searchKey, searchableColumns);


            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

            // Fetch the transformed data with optimized query
            const transformedData = await blogDb.blog.findMany({
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
            });

            const totalCount = await blogDb.blog.count({
                  where: dynamicFilter,
            })

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

            let INITIAL_VISIBLE_COLUMNS = ["id", "added_by", "title", "status", "created_at", "actions"];

            const columns = Object.keys(flattenedData[0]).map((key) => {
                  let columnName;

                  switch (key) {
                        case "id":
                              columnName = "ID";
                              break;
                        case "title":
                              columnName = "Title";
                              break;
                        case "image":
                              columnName = "Image";
                              break;
                        case "status":
                              columnName = "Status";
                              break;
                        case "added_by":
                              columnName = "Added By";
                              break;
                        default:
                              columnName = key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');
                  }

                  return {
                        name: columnName,
                        uid: key,
                        sortable: true,
                  };
            });

            columns.push({
                  name: "Actions",
                  uid: "actions",
            });

            // const columns = [
            //       { name: "ID", uid: "id", sortable: true },
            //       { name: "NAME", uid: "name", sortable: true },
            //       { name: "AGE", uid: "age", sortable: true },
            //       { name: "ROLE", uid: "role", sortable: true },
            //       { name: "TEAM", uid: "team" },
            //       { name: "EMAIL", uid: "email" },
            //       { name: "STATUS", uid: "status", sortable: true },
            //       { name: "ACTIONS", uid: "actions" },
            // ]

            const response = {
                  items: flattenedData,
                  INITIAL_VISIBLE_COLUMNS: INITIAL_VISIBLE_COLUMNS,
                  columns: columns,
                  selectedKeys: {},
                  isLoading: false,
                  totalCount: totalCount,
                  loadingState: "idle",
                  filterText: ""
            };
            return NextResponse.json([response]);
      } catch (error) {
            console.error("Error fetching details:", error);
            return NextResponse.json(
                  { error: "Internal Server Error" },
                  { status: 500 }
            );
      }
}