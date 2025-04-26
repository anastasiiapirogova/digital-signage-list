import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const productCollections = defineCollection({
    loader: glob({ pattern: ['*.md'], base: './src/content/collections' }),
    schema: z.object({
        slug: z.string(),
        title: z.string(),
        description: z.string(),
        seo: z.object({
            title: z.string(),
            description: z.string(),
        }),
        filters: z.array(
            z.object({
                field: z.string(),
                has: z.string().optional(),
                is: z.union([z.string(), z.boolean()]).optional(),
            })
        ),
    }),
});

export const collections = { productCollections };