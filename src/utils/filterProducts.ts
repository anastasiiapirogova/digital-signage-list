import type { Product } from './productsSchema'
import type { ProductFilters } from '../stores/productFilters'

export function filterProducts(products: Product[], filters: ProductFilters) {
	return products.filter(product => {
		const categoryMatch = product.categories.includes(filters.category)
		const search = filters.searchTerm.toLowerCase()
		const searchMatch =
			!filters.searchTerm ||
			product.name.toLowerCase().includes(search) ||
			product.description.toLowerCase().includes(search) ||
			(product.headquarters &&
				(typeof product.headquarters === 'string'
					? product.headquarters.toLowerCase().includes(search)
					: product.headquarters.some(hq => hq.toLowerCase().includes(search))
				)
			) ||
			product.website.toLowerCase().includes(search)

		const isOpenSource = product.open_source === true
		const openSourceMatch =
			(filters.showOpenSource && isOpenSource) ||
			(filters.showProprietary && !isOpenSource)

		return categoryMatch && searchMatch && openSourceMatch
	})
} 