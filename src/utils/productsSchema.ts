import { z } from 'zod'

const ProductCategorySchema = z.enum(['CMS', 'Content provider', 'Computer vision'])

const PricingSchema = z.object({
	name: z.string(),
	payment_model: z.string(),
	billing_basis: z.string(),
	monthly: z.number().nullable(),
	yearly: z.number().nullable(),
})

const ModelSchema = z.object({
	delivery: z.string(),
	pricing: z.array(PricingSchema),
	free_trial: z.boolean(),
	pricing_available: z.boolean(),
	has_freemium: z.boolean(),
})

const StatsSchema = z.object({
	screens: z.object({
		total: z.number(),
		source: z.string(),
		date: z.string(),
	}).optional(),
}).optional()

const CmsPropertiesSchema = z.object({
	supported_platforms: z.array(z.string()),
}).optional().nullable()

const ProductSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string(),
	website: z.string().url(),
	headquarters: z.union([z.string(), z.array(z.string())]).nullable(),
	open_source: z.boolean(),
	self_signup: z.boolean(),
	discontinued: z.boolean(),
	year_founded: z.number().nullable(),
	notes: z.array(z.string()).optional().default([]),
	stats: StatsSchema,
	has_logo: z.boolean(),
	categories: z.array(ProductCategorySchema),
	models: z.array(ModelSchema),
	cms_properties: CmsPropertiesSchema,
})

const ProductsSchema = z.array(ProductSchema)

export { ProductSchema, ProductsSchema, ModelSchema, PricingSchema, CmsPropertiesSchema }

export type Product = z.infer<typeof ProductSchema>
export type Products = z.infer<typeof ProductsSchema>
export type Model = z.infer<typeof ModelSchema>
export type Pricing = z.infer<typeof PricingSchema>
export type CmsProperties = z.infer<typeof CmsPropertiesSchema>
export type ProductCategory = z.infer<typeof ProductCategorySchema>