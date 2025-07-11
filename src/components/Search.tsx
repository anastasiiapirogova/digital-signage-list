import { useStore } from '@nanostores/react'
import { productFilters, setSearchTerm } from '../stores/productFilters'
import { useCallback, type ChangeEvent } from 'react'

export const Search = () => {
	const filters = useStore(productFilters)
	
	const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}, [])
	
	return (
		<div className="w-full max-w-md">
			<div className="relative">
				<input 
					type="text" 
					placeholder="Search products..." 
					value={filters.searchTerm}
					onChange={handleSearchChange}
					className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
				/>
				{filters.searchTerm && (
					<button
						onClick={() => setSearchTerm('')}
						className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
						aria-label="Clear search"
					>
						×
					</button>
				)}
			</div>
		</div>
	)
}