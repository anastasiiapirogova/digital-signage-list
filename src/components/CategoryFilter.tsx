import { useStore } from '@nanostores/react'
import { productFilters, setCategoryFilter } from '../stores/productFilters'
import type { ProductCategory } from '../utils/productsSchema'
import { products } from '../utils/products'
import { useMemo } from 'react'
import { filterProducts } from '../utils/filterProducts'

export const CategoryFilter = () => {
	const filters = useStore(productFilters)
	
	const allCategories: ProductCategory[] = ['CMS', 'Content provider']

	const categoryCounts = useMemo(() => {
		return allCategories.reduce((acc, category) => {
			acc[category] = filterProducts(products, { ...filters, category }).length
			return acc
		}, {} as Record<ProductCategory, number>)
	}, [filters.searchTerm, filters.showOpenSource, filters.showProprietary])

	const handleCategoryClick = (category: ProductCategory) => {
		setCategoryFilter(category)
	}
    
	return (
		<div className="flex flex-col space-y-4">
			<div className="flex flex-wrap gap-2">
				{allCategories.map((category) => (
					<button
						key={category}
						onClick={() => handleCategoryClick(category)}
						className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 border border-gray-300 hover:border-gray-400 ${
							filters.category === category
								? 'bg-blue-500 text-white border-blue-500'
								: 'bg-white text-gray-700 hover:bg-gray-50'
						}`}
					>
						{category} ({categoryCounts[category]})
					</button>
				))}
			</div>
		</div>
	)
}