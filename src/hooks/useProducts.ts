import { useStore } from '@nanostores/react'
import { productFilters } from '../stores/productFilters'
import { useMemo } from 'react'
import { products } from '../utils/products'
import { filterProducts } from '../utils/filterProducts'

export const useProducts = () => {
	const filters = useStore(productFilters)
	return useMemo(() => filterProducts(products, filters), [filters.category, filters.searchTerm, filters.showOpenSource, filters.showProprietary, filters.selectedPlatforms])
}