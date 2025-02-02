import { PrismaClient as BlogPrismaClient } from "../../generated/blog";
import { PrismaClient as CmsPrismaClient } from "../../generated/cms";

const blogDb = new BlogPrismaClient();
const CmsDb = new CmsPrismaClient();

const BASE_URL = process.env.NEXT_PUBLIC_S3_BLOG_URL;
blogDb.$use(async (params, next) => {
      const result = await next(params);

      if (params.model === 'Blog' && (params.action === 'findMany' || params.action === 'findUnique')) {
            if (Array.isArray(result)) {
                  return await Promise.all(
                        result.map(async (blog) => {
                              // Await the user details for each blog
                              const userDetails = await getUserDetails(blog.added_by);

                              return {
                                    ...blog,
                                    image: blog.image ? `${BASE_URL}${blog.image}` : null,
                                    added_by: userDetails,  // Ensure user details are populated
                              };
                        })
                  );
            } else if (result) {
                  // Await the user details for a single result
                  const userDetails = await getUserDetails(result.added_by);

                  return {
                        ...result,
                        image: result.image ? `${BASE_URL}${result.image}` : null,
                        added_by: userDetails,  // Ensure user details are populated
                  };
            }
      }

      return result;
});


async function getUserDetails(userId) {
      try {
            const userDetails = await CmsDb.oc_user.findUnique({
                  where: {
                        user_id: userId,
                  },
                  select: {
                        user_id: true,
                        username: true,
                  },
            });
            return userDetails;
      } catch (error) {
            console.error("Error fetching user details:", error);
            throw new Error("Could not fetch user details");
      }
}

export { blogDb, CmsDb };
