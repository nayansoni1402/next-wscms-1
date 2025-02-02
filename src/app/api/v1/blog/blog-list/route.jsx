// npx prisma generate --schema=prisma/schema.blog.prisma
// npx prisma db push --schema=prisma/schema.blog.prisma
// npx prisma db pull --schema=prisma/schema.blog.prisma
// npx prisma migrate dev --name add_updated_at_trigger --schema=prisma/schema.blog.prisma
// npx prisma migrate deploy  --schema=prisma/schema.blog.prisma

import { blogDb } from "@/lib/prismaClients";
import { NextResponse } from "next/server";
// import { VendorDetailSchema } from "@/lib/schema/vendorDetailSchema";
// import { z } from "zod";


export async function GET(request) {
      try {
            const { searchParams } = new URL(request.url);

            // Pagination parameters
            const page = Math.max(parseInt(searchParams.get("page"), 10) || 1, 1);
            const limit = Math.min(parseInt(searchParams.get("limit"), 10) || 20, 100);
            const skip = (page - 1) * limit;

            const searchKey = searchParams.get("search_key");

            const searchableColumns = [
                  "id",
                  "title",
                  "slug",
                  "meta_title",
            ];

            const dynamicFilter = searchKey
                  ? {
                        OR: searchableColumns.map((column) => ({
                              [column]: { contains: searchKey, mode: "insensitive" },
                        })),
                  }
                  : {};



            // Fetch with pagination
            const transformedData = await blogDb.blog.findMany({
                  where: dynamicFilter,
                  orderBy: { id: "desc" },
                  skip,
                  take: limit,
            });


            // Calculate total pages

            // Return the response with pagination information

            let data = [
                  {
                        "id": "7",
                        "name": "Ravi Sharma",
                        "txttitle": "7+ Home DÃ©cor Ideas to Decorate Small Spaces Creatively",
                        "status": "active",
                        "img": "1603866530banner (1).jpg"
                  },
                  {
                        "id": "8",
                        "postby": "Ravi Sharma",
                        "txttitle": "Chesterfield Inspired Furniture- The Other Side of Chesterfield sofas",
                        "status": "disable",
                        "img": "152093167715204130428.jpg"
                  },
                  {
                        "id": "9",
                        "postby": "Ravi Sharma",
                        "txttitle": "Top 10 Trend-Setting Bed Designs of Wooden Street",
                        "status": "active",
                        "img": "15205950041516261901drewno-upholstered-bed-red-max-280.webp"
                  },
                  {
                        "id": "10",
                        "postby": "Rachana",
                        "txttitle": "Design Tour Of A 2-BHK Apartment",
                        "status": "active",
                        "img": "15241385938.jpg"
                  },
                  {
                        "id": "13",
                        "postby": "Rachana",
                        "txttitle": "Experience the Experience Store",
                        "status": "active",
                        "img": "152413857617.jpg"
                  },
                  {
                        "id": "16",
                        "postby": "Rachana",
                        "txttitle": "The Pride of Dev Household",
                        "status": "active",
                        "img": "15241385481.jpg"
                  },
                  {
                        "id": "17",
                        "postby": "Rachana",
                        "txttitle": "The Minimalist Home of Mrs. Marcela",
                        "status": "active",
                        "img": "15241385354.jpg"
                  },
                  {
                        "id": "18",
                        "postby": "Rachana",
                        "txttitle": "Their Words, Our Pride | Delhi",
                        "status": "active",
                        "img": "15241385212.jpg"
                  },
                  {
                        "id": "19",
                        "postby": "Rachana",
                        "txttitle": "Their Words Our Pride | Mumbai",
                        "status": "active",
                        "img": "152413849816.jpg"
                  },
                  {
                        "id": "20",
                        "postby": "Rachana",
                        "txttitle": "For the Beautiful Foyer of Kenny MacGregor",
                        "status": "active",
                        "img": "15241384776.jpg"
                  },
                  {
                        "id": "21",
                        "postby": "Rachana",
                        "txttitle": "For the Bright and White Interior of Arpit Rajain",
                        "status": "active",
                        "img": "152413845110.jpg"
                  },
                  {
                        "id": "22",
                        "postby": "Rachana",
                        "txttitle": "Add the Colours of Summer with Wooden Street",
                        "status": "active",
                        "img": "152413842211.jpg"
                  },
                  {
                        "id": "23",
                        "postby": "Rachana",
                        "txttitle": "Savithri Subramanianâ€™s New Dining Decor",
                        "status": "active",
                        "img": "152413840114.jpg"
                  },
                  {
                        "id": "24",
                        "postby": "Rachana",
                        "txttitle": "The Timber Talk",
                        "status": "disable",
                        "img": "1524138385cover1.jpg"
                  },
                  {
                        "id": "25",
                        "postby": "Admin",
                        "txttitle": "From the List of Bestsellers | Beds",
                        "status": "active",
                        "img": "152413828512.jpg"
                  },
                  {
                        "id": "26",
                        "postby": "Admin",
                        "txttitle": "Pride of The Potnuru Household",
                        "status": "active",
                        "img": "152413827115.jpg"
                  },
                  {
                        "id": "27",
                        "postby": "Admin",
                        "txttitle": "Beautifying the Apartment of Dr Ramanathan",
                        "status": "active",
                        "img": "1524134279cover-2.jpg"
                  },
                  {
                        "id": "28",
                        "postby": "Admin",
                        "txttitle": "Custom Corner | Wingback Chair",
                        "status": "active",
                        "img": "152413825113.jpg"
                  },
                  {
                        "id": "29",
                        "postby": "Admin",
                        "txttitle": "Experience the Experience Store | Bengaluru",
                        "status": "active",
                        "img": "15241382357.jpg"
                  },
                  {
                        "id": "30",
                        "postby": "Admin",
                        "txttitle": "New Beginnings in a New Apartment | Kuldeep Kaul",
                        "status": "active",
                        "img": "1524133034cover.jpg"
                  },
                  {
                        "id": "31",
                        "postby": "Admin",
                        "txttitle": "Their Words Our Pride | Bengaluru",
                        "status": "active",
                        "img": "1524199094cover-min.jpg"
                  },
                  {
                        "id": "32",
                        "postby": "Admin",
                        "txttitle": "Redefining Studies with Wooden Street",
                        "status": "active",
                        "img": "1524139204cover.jpg"
                  }
            ];
            let INITIAL_VISIBLE_COLUMNS = ["name", "role", "status", "actions"];

            const columns = [
                  { name: "ID", uid: "id", sortable: true },
                  { name: "NAME", uid: "name", sortable: true },
                  { name: "AGE", uid: "age", sortable: true },
                  { name: "ROLE", uid: "role", sortable: true },
                  { name: "TEAM", uid: "team" },
                  { name: "EMAIL", uid: "email" },
                  { name: "STATUS", uid: "status", sortable: true },
                  { name: "ACTIONS", uid: "actions" },
            ]

            const response = {
                  items1: transformedData,
                  items: data,
                  INITIAL_VISIBLE_COLUMNS: INITIAL_VISIBLE_COLUMNS,
                  columns: columns,
                  selectedKeys: {},
                  isLoading: false,
                  loadingState: "idle",
                  filterText: ""
            };
            return NextResponse.json([response]);
      } catch (error) {
            console.error("Error fetching vendor details:", error);
            return NextResponse.json(
                  { error: "Internal Server Error" },
                  { status: 500 }
            );
      }
}

// export async function POST(request) {
//       try {
//             const body = await request.json();

//             const parsedData = await VendorDetailSchema.parseAsync(body);

//             const newVendorDetail = await prisma.vendorDetail.create({
//                   data: parsedData,
//             });

//             return NextResponse.json(newVendorDetail, { status: 201 });
//       } catch (error) {
//             if (error instanceof z.ZodError) {
//                   const formattedErrors = error.errors.map((err) => ({
//                         field: err.path.join("."),
//                         message: err.message,
//                   }));

//                   return NextResponse.json(
//                         { error: "Validation failed", issues: formattedErrors },
//                         { status: 400 }
//                   );
//             }

//             // Handle other errors
//             return NextResponse.json(
//                   { error: "Failed to create vendor detail", details: error.message },
//                   { status: 500 }
//             );
//       }
// }