import { atom } from 'nanostores'
import type { ProductCategory } from '../utils/productsSchema'

export type ProductFilters = {
	category: ProductCategory
	searchTerm: string
	showOpenSource: boolean
	showProprietary: boolean
}

export const productFilters = atom<ProductFilters>({
	category: 'CMS',
	searchTerm: '',
	showOpenSource: true,
	showProprietary: true,
})

export const setCategoryFilter = (category: ProductCategory | null) => {
	productFilters.set({
		...productFilters.get(),
		category: category ?? 'CMS',
	})
}

export const setSearchTerm = (searchTerm: string) => {
	productFilters.set({
		...productFilters.get(),
		searchTerm,
	})
}

export const setShowOpenSource = (show: boolean) => {
	productFilters.set({
		...productFilters.get(),
		showOpenSource: show,
	})
}

export const setShowProprietary = (show: boolean) => {
	productFilters.set({
		...productFilters.get(),
		showProprietary: show,
	})
}

export const clearFilters = () => {
	productFilters.set({
		category: 'CMS',
		searchTerm: '',
		showOpenSource: true,
		showProprietary: true,
	})
} 