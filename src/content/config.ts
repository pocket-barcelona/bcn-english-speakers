import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  // Type-check frontmatter using a schema
  schema: ({ image }) => z.object({
    draft: z.boolean(),
    title: z.string(),
    snippet: z.string(),
    /** The cover image
     * https://docs.astro.build/en/guides/images/#images-in-content-collections
     */
    cover: image().refine((img) => img.width >= 720, {
      message: "Image width must be at least 720px",
      
    }),
    coverAlt: z.string(),
    // Transform string to Date object
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default("BCN Experts"),
    authorId: z.string().default("pb"),
    category: z.string(),
    tags: z.array(z.string()),
  }),
});

const communityCollection = defineCollection({
  // Type-check frontmatter using a schema
  schema: ({ image }) => z.object({
    draft: z.boolean().optional(),
    images: z.array(
      z.object({
        src: image().refine((img) => img.width >= 500, {
          message: "Image width must be at least 500px",
        }),
        alt: z.string()
      })
    )
  }),
});


export const collections = {
  blog: blogCollection,
  community: communityCollection
};
