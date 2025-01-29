import { PrismaClient as BlogPrismaClient } from "@prisma/generated/blog";
import { PrismaClient as CmsPrismaClient } from "@prisma/generated/cms";
import { PrismaClient as CrmPrismaClient } from "@prisma/generated/crm";

const blogDb = new BlogPrismaClient();
const cmsDb = new CmsPrismaClient();
const crmDb = new CrmPrismaClient();

export { blogDb, cmsDb, crmDb };
