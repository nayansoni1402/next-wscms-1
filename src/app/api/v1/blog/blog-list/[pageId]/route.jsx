import { blogDb, CmsDb } from "@/lib/prismaClients";
import { generalValidationSchema, seoValidationSchema } from "@/wsui/allSchema/blogEditSchema";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
      try {
            const { pageId } = params;

            const formData = await req.json();
            const parsedGeneralData = generalValidationSchema.parse(formData);
            const parsedSeoData = seoValidationSchema.parse(formData);
            const parsedData = { ...parsedGeneralData, ...parsedSeoData };
            const formattedData = {
                  ...parsedData,
                  author_id: parsedData.author_id ? Number(parsedData.author_id) : undefined,
                  category_id: parsedData.category_id ? Number(parsedData.category_id) : undefined,
                  view: parsedData.view ? Number(parsedData.view) : undefined,
                  status: parsedData.status ? Number(parsedData.status) : undefined,
                  publish_date: parsedData.publish_date && !isNaN(Date.parse(parsedData.publish_date))
                        ? new Date(parsedData.publish_date)
                        : undefined,
            };


            const updateData = Object.fromEntries(
                  Object.entries(formattedData).filter(([_, value]) => value !== "" && value !== null && value !== undefined)
            );

            const updatedBlog = await blogDb.blog.update({
                  where: { id: Number(pageId) },
                  data: updateData,
            });

            if (!updatedBlog) {
                  return NextResponse.json({ message: "Blog not found" }, { status: 404 });
            }
            return NextResponse.json(updatedBlog, { status: 200 });

      } catch (error) {
            console.error("Error updating blog:", error);
            await blogDb.$disconnect();
            await CmsDb.$disconnect();
            return NextResponse.json({ error: error.message }, { status: 500 });
      }
}


export async function GET(req, { params }) {
      try {
            const { pageId } = params;
            console.log(pageId);

            const blogs = await blogDb.blog.findUnique({
                  where: { id: Number(pageId) }, // Convert pageId to a number if it's an integer ID
            });

            if (!blogs) {
                  return NextResponse.json({ message: "Blog not found" }, { status: 404 });
            }

            return NextResponse.json(blogs);

      } catch (error) {
            console.error("Error fetching details:", error);
            await blogDb.$disconnect();
            await CmsDb.$disconnect();
            return NextResponse.json({ error: error.message }, { status: 500 });
      }
}
