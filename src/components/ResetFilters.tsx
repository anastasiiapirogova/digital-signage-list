import { clearFilters } from '../stores/productFilters'

export const ResetFilters = () => (
	<button
		className="px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 border border-gray-300 hover:border-gray-400 bg-white text-gray-700 hover:bg-gray-50"
		onClick={() => clearFilters()}
		type="button"
	>
        Reset filters
	</button>
) 