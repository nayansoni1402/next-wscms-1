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

            const COLUMN_NAMES = {
                  id: "ID",
                  title: "Title",
                  status: "Status",
                  added_by: "Added By",
                  ref_id: "Ref id",
                  image_alt: "Image alt",
                  view: "View",
                  author_name: "Author name",
            };

            const totalCount = await blogDb.blog.count();
            const columns = Object.keys(COLUMN_NAMES).map((key) => ({
                  name: COLUMN_NAMES[key] || key.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase()),
                  uid: key,
                  sortable: true
            }));

            columns.push({ name: "Actions", uid: "actions" });

            const response = {
                  INITIAL_VISIBLE_COLUMNS: ["id", "added_by", "title", "status", "created_at", "actions"],
                  columns: columns,
                  totalCount: totalCount,
            };

            return NextResponse.json(response);
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