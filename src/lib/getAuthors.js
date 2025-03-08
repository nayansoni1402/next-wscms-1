"use server";

import { unstable_cache } from "next/cache";
import { ROBOT_LABELS } from "./helper";
import { blogDb } from "./prismaClients";

async function getOptions(table) {
    try {
        await blogDb.$connect(); // Ensure Prisma connection is open

        const records = await blogDb[table].findMany({
            select: { id: true, name: true },
        });

        return records.reduce((acc, item) => {
            acc[item.id] = item.name;
            return acc;
        }, {});
    } catch (error) {
        console.error(`Error fetching data from ${table}:`, error);
        return {}; // Return empty object in case of failure
    } finally {
        await blogDb.$disconnect(); // Always close the connection
    }
}

export async function fetchOptions(fields) {
    const options = {};

    for (const field of fields) {
        switch (field) {
            case "author_id":
                options["author_id"] = await getAuthor();
                break;
            case "category_id":
                options["category_id"] = await getCategories();
                break;
            case "user_id":
                options["user_id"] = await getOptions("user");
                break;
            case "robots":
                options["robots"] = ROBOT_LABELS;
                break;
            default:
                options[field] = {}; // Empty object for unknown fields
        }
    }
    console.log(options);
    return options;
}
export async function getAuthors() {
    try {
        await blogDb.$connect(); // Ensure Prisma connection is open

        const authors = await blogDb.author.findMany({
            select: { id: true, name: true },
            orderBy: { name: "asc" },
        });

        const formattedData = authors.map(item => ({
            id: item.id,
            title: item.name,
        }));
        return formattedData;
    } catch (error) {
        console.error("Error fetching authors:", error);
        return {}; // Return empty object in case of failure
    } finally {
        await blogDb.$disconnect(); // Always close the connection
    }
}


export async function getCategory() {
    try {
        console.log("options------");
        await blogDb.$connect(); // Ensure Prisma connection is open

        const category = await blogDb.category.findMany({
            select: { id: true, title: true },
            orderBy: { title: "asc" },
            where: { status: 1 },
        });
        return category;
    } catch (error) {
        console.error("Error fetching category:", error);
        return {}; // Return empty object in case of failure
    } finally {
        await blogDb.$disconnect(); // Always close the connection
    }
}

export const getCategories = unstable_cache(
    async () => {
        console.log("options------");
        return await getCategory();
    },
    ["categories"],
    { revalidate: 86400 } // Cache for 24 hours
);


export const getAuthor = unstable_cache(
    async () => {
        console.log("getAuthor------");
        return await getAuthors();
    },
    ["categories"],
    { revalidate: 86400 } // Cache for 24 hours
);
