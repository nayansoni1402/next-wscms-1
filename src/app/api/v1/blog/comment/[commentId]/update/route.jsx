import { blogDb, CmsDb } from "@/lib/prismaClients";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
    try {
        const { commentId } = params;
        const formData = await req.json();



        const updateData = Object.fromEntries(
            Object.entries(formData).filter(([key, value]) => value !== "" && value !== null && value !== undefined && key !== 'tabId')
        );

        const comment = await blogDb.comment.update({
            where: { id: Number(commentId) },
            data: updateData,
        })

        if (!comment) {
            return NextResponse.json({ message: "comment not found" }, { status: 404 });
        }
        return NextResponse.json(comment, { status: 200 });

    } catch (error) {
        console.error("Error updating blog:", error);
        await blogDb.$disconnect();
        await CmsDb.$disconnect();
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
