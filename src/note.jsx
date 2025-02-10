const ROBOT_LABELS = {
      INDEX_FOLLOW: "Index, Follow",
      NOINDEX_NOFOLLOW: "Noindex Nofollow",
      INDEX_NOFOLLOW: "Index Nofollow",
      NOINDEX_FOLLOW: "Noindex Follow",
};


// npx prisma generate --schema=prisma/schema.blog.prisma
// npx prisma db push --schema=prisma/schema.blog.prisma
// npx prisma db pull --schema=prisma/schema.blog.prisma
// npx prisma migrate dev --name add_updated_at_trigger --schema=prisma/schema.blog.prisma
// npx prisma migrate deploy  --schema=prisma/schema.blog.prisma