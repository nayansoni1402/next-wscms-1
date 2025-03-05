import { z } from "zod"

export const generalValidationSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters.").max(100, "Title cannot exceed 100 characters."),
    slug: z.string()
        .min(3, "Slug must be at least 3 characters.")
        .max(100, "Slug cannot exceed 100 characters.")
        .regex(/^[a-zA-Z0-9-]+$/, "Slug must only contain letters, numbers, and hyphens."),
    author_id: z.string().optional(),
    category_id: z.string().optional(),
    publish_date: z.string().optional(),
    view: z.coerce.number().min(1, "View count must be at least 1.").max(9999999999, "View count cannot exceed 10 digits."),
    image_alt: z.string().min(3, "Alt text must be at least 3 characters.").max(100, "Alt text cannot exceed 100 characters."),
    image: z.any().optional(),
});



export const seoValidationSchema = z.object({
    meta_title: z.string()
        .min(10, "Meta title must be at least 10 characters.")
        .max(60, "Meta title cannot exceed 60 characters."),

    meta_description: z.string()
        .min(20, "Meta description must be at least 20 characters.")
        .max(160, "Meta description cannot exceed 160 characters."),

    meta_keywords: z.string()
        .min(5, "Keywords must be at least 5 characters.")
        .max(100, "Keywords cannot exceed 100 characters."),

    new_redirect: z.string()
        .min(5, "Redirect URL must be at least 5 characters.")
        .max(100, "Redirect URL cannot exceed 100 characters."),

    robots: z.string()
        .min(3, "Robots value must be at least 3 characters.")
        .max(50, "Robots value cannot exceed 50 characters."),
    og_image: z.string(),
});


