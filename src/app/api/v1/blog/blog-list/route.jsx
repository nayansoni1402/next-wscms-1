import { NextResponse } from "next/server";
// import { VendorDetailSchema } from "@/lib/schema/vendorDetailSchema";
// import { z } from "zod";
// import prisma from "@/lib/prisma";


export async function GET(request) {
      try {
            const { searchParams } = new URL(request.url);

            // Pagination parameters
            const page = Math.max(parseInt(searchParams.get("page"), 10) || 1, 1);
            const limit = Math.min(parseInt(searchParams.get("limit"), 10) || 20, 100);
            const skip = (page - 1) * limit;

            // const searchKey = searchParams.get("search_key");

            // const searchableColumns = [
            //       "category",
            //       "brandName",
            //       "vendorName",
            //       "contactPersonName",
            //       "contactNo",
            //       "city",
            //       "state",
            //       "website",
            //       "extra",
            // ];

            // const dynamicFilter = searchKey
            //       ? {
            //             OR: searchableColumns.map((column) => ({
            //                   [column]: { contains: searchKey, mode: "insensitive" },
            //             })),
            //       }
            //       : {};

            // // Fetch the total count of vendors
            // const total = await prisma.vendorDetail.count({
            //       where: dynamicFilter,
            // });

            // // Fetch with pagination
            // const transformedData = await prisma.vendorDetail.findMany({
            //       where: dynamicFilter,
            //       orderBy: { id: "desc" },
            //       skip,
            //       take: limit,
            // });

            // const data = transformedData.map(({ verified, ...item }) => ({
            //       ...item,
            //       status: verified,
            // }));

            // // Calculate total pages

            // Return the response with pagination information

            let data = [
                  {
                        id: 1,
                        title: "26 January: History, Decor Tips, and Republic Day Spirit",
                        heading: "Republic Day 2025: 26 January Decoration and Celebration Ideas",
                        date: "Jan 20th, 12:00",
                        status: "active",
                        img: "",
                  },
                  {
                        id: 2,
                        title: "Pantone Color of the Year 2025: Embrace ‘Mocha Mousse’ in Your Home",
                        heading: "Transform Your Space with Pantone Color of the Year 2025: Mocha Mousse",
                        date: "Dec 31st 2024, 12:00",
                        status: "active",
                        img: "",
                  },
                  {
                        id: 3,
                        title: "Sheesham Wood vs Teak Wood: Which One Should You Choose?",
                        heading: "Teak Wood vs Sheesham Wood: Everything You Need to Know",
                        date: "Dec 24th 2024, 12:00",
                        status: "active",
                        img: "",
                  },
                  {
                        id: 4,
                        title: "10+ Easy New Year Decoration Ideas for a Memorable Celebration",
                        heading: "10+ Simple and Stunning New Year Decoration Ideas for Home",
                        date: "Dec 18th 2024, 12:00",
                        status: "active",
                        img: "",
                  },
            ];
            const totalPages = Math.ceil(data.length / limit);

            const response = {
                  data,
                  total: data.length,
                  page,
                  totalPages,
            };

            return NextResponse.json(response);
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