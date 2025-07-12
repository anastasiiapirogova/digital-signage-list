import { useStore } from '@nanostores/react'
import { productFilters, togglePlatform } from '../stores/productFilters'
import { useState, useMemo, useEffect, useRef } from 'react'
import { products } from '../utils/products'
import { filterProducts } from '../utils/filterProducts'
import platformsData from '../../data/charts/productsBySupportedPlatforms.json'

export const PlatformFilter = () => {
	const filters = useStore(productFilters)
	const [isOpen, setIsOpen] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)
	
	const allPlatforms = Object.keys(platformsData).sort()
	
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false)
			}
		}

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isOpen])
	
	const platformCounts = useMemo(() => {
		return allPlatforms.reduce((acc, platform) => {
			const tempFilters = {
				...filters,
				selectedPlatforms: [platform]
			}
			acc[platform] = filterProducts(products, tempFilters).length
			return acc
		}, {} as Record<string, number>)
	}, [filters.category, filters.searchTerm, filters.showOpenSource, filters.showProprietary])

	const sortedPlatforms = useMemo(() => {
		return allPlatforms.sort((a, b) => platformCounts[b] - platformCounts[a])
	}, [allPlatforms, platformCounts])

	const handlePlatformToggle = (platform: string) => {
		togglePlatform(platform)
	}

	const getSelectText = () => {
		if (filters.selectedPlatforms.length === 0) {
			return 'All Platforms'
		}
		if (filters.selectedPlatforms.length === 1) {
			return filters.selectedPlatforms[0]
		}
		return `${filters.selectedPlatforms[0]} (+${filters.selectedPlatforms.length - 1})`
	}

	return (
		<div className="relative" ref={dropdownRef}>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white text-left flex items-center justify-between"
			>
				<span className="text-gray-700">{getSelectText()}</span>
				<svg
					className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
				</svg>
			</button>
			
			{isOpen && (
				<div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
					<div className="p-2">
						{sortedPlatforms.map((platform) => (
							<label
								key={platform}
								className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer rounded"
							>
								<input
									type="checkbox"
									checked={filters.selectedPlatforms.includes(platform)}
									onChange={() => handlePlatformToggle(platform)}
									className="accent-blue-500"
								/>
								<span className="flex-1 text-sm text-gray-700">{platform}</span>
								<span className="text-xs text-gray-500">({platformCounts[platform]})</span>
							</label>
						))}
					</div>
				</div>
			)}
		</div>
	)
}