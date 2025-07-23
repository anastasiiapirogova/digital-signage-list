import { useEffect } from 'react'
import { useStore } from '@nanostores/react'
import { productFilters, setCategoryFilter, setSearchTerm, setShowOpenSource, setShowProprietary, setSelectedPlatforms, setSignupIsOpenOnly } from '../stores/productFilters'
import { z } from 'zod'
import type { ProductCategory } from '../utils/productsSchema'

const FilterSearchParamsSchema = z.object({
	category: z.enum(['CMS', 'Content provider', 'Computer vision']).optional(),
	search: z.string().optional(),
	openSource: z.enum(['true', 'false']).optional(),
	proprietary: z.enum(['true', 'false']).optional(),
	platforms: z.string().optional(),
	signupIsOpenOnly: z.enum(['true', 'false']).optional(),
})

type FilterSearchParams = z.infer<typeof FilterSearchParamsSchema>

export const useFilterSync = () => {
	const filters = useStore(productFilters)

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search)
		const searchParams: FilterSearchParams = {}
		
		if (urlParams.has('category')) searchParams.category = urlParams.get('category') as ProductCategory
		if (urlParams.has('search')) searchParams.search = urlParams.get('search') || ''
		if (urlParams.has('openSource')) searchParams.openSource = urlParams.get('openSource') as 'true' | 'false'
		if (urlParams.has('proprietary')) searchParams.proprietary = urlParams.get('proprietary') as 'true' | 'false'
		if (urlParams.has('platforms')) searchParams.platforms = urlParams.get('platforms') || ''
		if (urlParams.has('signupIsOpenOnly')) searchParams.signupIsOpenOnly = urlParams.get('signupIsOpenOnly') as 'true' | 'false'
		const result = FilterSearchParamsSchema.safeParse(searchParams)
		if (result.success) {
			const validParams = result.data
			
			if (validParams.category) {
				setCategoryFilter(validParams.category)
			}
			if (validParams.search !== undefined) {
				setSearchTerm(validParams.search)
			}
			if (validParams.openSource !== undefined) {
				setShowOpenSource(validParams.openSource === 'true')
			}
			if (validParams.proprietary !== undefined) {
				setShowProprietary(validParams.proprietary === 'true')
			}
			if (validParams.platforms) {
				const platforms = validParams.platforms.split(',').filter(p => p.trim())
				setSelectedPlatforms(platforms)
			}
			if (validParams.signupIsOpenOnly !== undefined) {
				setSignupIsOpenOnly(validParams.signupIsOpenOnly === 'true')
			}
		}
	}, [])

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search)
		
		urlParams.set('category', filters.category)
		if (filters.searchTerm) {
			urlParams.set('search', filters.searchTerm)
		} else {
			urlParams.delete('search')
		}
		urlParams.set('openSource', filters.showOpenSource.toString())
		urlParams.set('proprietary', filters.showProprietary.toString())
		urlParams.set('signupIsOpenOnly', filters.signupIsOpenOnly.toString())
		if (filters.selectedPlatforms.length > 0) {
			urlParams.set('platforms', filters.selectedPlatforms.join(','))
		} else {
			urlParams.delete('platforms')
		}

		const newUrl = `${window.location.pathname}?${urlParams.toString()}`
		window.history.replaceState({}, '', newUrl)
	}, [filters.category, filters.searchTerm, filters.showOpenSource, filters.showProprietary, filters.selectedPlatforms, filters.signupIsOpenOnly])
} 