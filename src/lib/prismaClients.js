import { PrismaClient as BlogPrismaClient } from "../../generated/blog";

const blogDb = new BlogPrismaClient();

const BASE_URL = process.env.NEXT_PUBLIC_S3_BLOG_URL;

blogDb.$use(async (params, next) => {
      const result = await next(params);

      if (params.model === 'Blog' && (params.action === 'findMany' || params.action === 'findUnique')) {
            if (Array.isArray(result)) {
                  return result.map(blog => ({
                        ...blog,
                        image: blog.image ? `${BASE_URL}${blog.image}` : null,
                  }));
            } else if (result) {
                  return {
                        ...result,
                        image: result.image ? `${BASE_URL}${result.image}` : null,
                  };
            }
      }

      return result;
});

export { blogDb };
