import { blogDb } from "./prismaClients";
export async function getAuthors() {
    const authors = await blogDb.user.findMany({
        select: { id: true, name: true },
    });

    return authors.reduce((acc, author) => {
        acc[author.id] = author.name;
        return acc;
    }, {});
}