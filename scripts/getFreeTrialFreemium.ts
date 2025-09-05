import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

interface ProductModel {
	delivery: string
	free_trial?: boolean
	pricing_available?: boolean
	has_freemium?: boolean
	pricing?: Array<{
		name: string
		payment_model: string
		billing_basis: string
		monthly: number | null
		yearly: number | null
	}>
}

interface Product {
	id: string
	name: string
	description: string
	website: string
	headquarters: string
	open_source: boolean
	self_signup: boolean
	discontinued: boolean
	year_founded: number
	notes: string[]
	stats: Record<string, unknown>
	has_logo: boolean
	categories: string[]
	models: ProductModel[]
	cms_properties?: {
		supported_platforms: string[]
	}
}

interface ProductCriteria {
	name: string
	criteria: string[]
}

function getFreeTrialFreemiumProducts(): ProductCriteria[] {
	try {
		const productsPath = path.join(__dirname, '..', 'data', 'products.json')
		const productsData = fs.readFileSync(productsPath, 'utf8')
		const products: Product[] = JSON.parse(productsData)

		const freeTrialFreemiumProducts: ProductCriteria[] = []

		products.forEach(product => {
			if (product.discontinued) return

			const criteria: string[] = []
			
			const hasFreeTrial = product.models.some(model => model.free_trial === true)
			if (hasFreeTrial) {
				criteria.push('free trial')
			}

			const hasFreemium = product.models.some(model => model.has_freemium === true)
			if (hasFreemium) {
				criteria.push('freemium')
			}

			if (product.open_source) {
				criteria.push('open source')
			}

			const openSignup = product.self_signup || product.open_source
			const hasFreeTrialOrFreemium = hasFreeTrial || hasFreemium
			const isCMS = product.categories.includes('CMS')

			if (hasFreeTrialOrFreemium && openSignup && isCMS) {
				freeTrialFreemiumProducts.push({
					name: product.name,
					criteria
				})
			}
		})

		return freeTrialFreemiumProducts
	} catch (error) {
		console.error('Error reading products data:', error)
		return []
	}
}

const freeTrialFreemiumProducts = getFreeTrialFreemiumProducts()

console.log('# Products with Free Trial or Freemium (CMS)')
console.log('')
console.log(`**Total count:** ${freeTrialFreemiumProducts.length}`)
console.log('')
console.log('| Product Name | Criteria |')
console.log('|--------------|----------|')
freeTrialFreemiumProducts.forEach((product) => {
	const criteriaText = product.criteria.join(', ')
	console.log(`| ${product.name} | ${criteriaText} |`)
})
