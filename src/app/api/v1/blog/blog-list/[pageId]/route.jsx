import { buildDynamicFilter, buildDynamicFilterAvd } from "@/lib/helper/buildDynamicFilter";
import { blogDb, CmsDb } from "@/lib/prismaClients";
import { formatDateMoment } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
      try {
            const { pageId } = params;
            console.log(pageId);

            const { title, content, author } = await req.json();

            const updatedBlog = await blogDb.blog.update({
                  where: { id: Number(pageId) }, // Ensure correct format
                  data: { title, content, author },
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
