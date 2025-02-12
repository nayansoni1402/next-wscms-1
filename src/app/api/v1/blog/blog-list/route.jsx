import { buildDynamicFilter } from "@/lib/helper/buildDynamicFilter";
import { blogDb, CmsDb } from "@/lib/prismaClients";
import { formatDateMoment } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(request) {
      try {
            const { searchParams } = new URL(request.url);
            const page = parseInt(searchParams.get("page") || "1", 10);
            const limit = 100;
            const skip = (page - 1) * limit;


            const searchKey = searchParams.get("search_key")?.trim() || null;
            const searchableColumns = ["id", "title"];
            const dynamicFilter = buildDynamicFilter(searchKey, searchableColumns);

            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 300);

            const totalCount = await blogDb.blog.count();
            const nextPage = page * limit < totalCount ? page + 1 : null;

            const blogs = await blogDb.blog.findMany({
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
                  orderBy: { id: "desc" },
                  where: dynamicFilter,
                  skip,
                  take: limit,
            });

            // Transform data
            const items = blogs.map(blog => ({
                  id: blog.id,
                  ref_id: blog.ref_id,
                  title: blog.title,
                  slug: blog.slug,
                  image: blog.image,
                  image_alt: blog.image_alt,
                  status: blog.status,
                  view: blog.view,
                  added_by: blog.added_by?.username || "Unknown",
                  userGroup: blog.added_by?.user_group_id || null,
                  added_by_profile: blog.added_by?.profile ?? null,
                  created_at: formatDateMoment(blog.created_at),
                  author_id: blog.author?.id || null,
                  author_name: blog.author?.name || "Unknown",
                  comments_count: blog.comments.length,
                  category_name: blog.category?.title || "Uncategorized",
                  category_name: blog.category?.title || "Uncategorized",
            }));

            const nextPageLink = nextPage == null ? null : `${process.env.NEXT_PUBLIC_BLOG_API_URL}/blog-list?page=${nextPage}`;
            return NextResponse.json({
                  results: items,
                  next: nextPageLink,
            });

      } catch (error) {
            console.error("Error fetching details:", error);
            await blogDb.$disconnect();
            await CmsDb.$disconnect();
            return NextResponse.json({ error: error.message }, { status: 500 });
      }
}
