import { useStore } from '@nanostores/react'
import { productFiltersStore, setProductFilters } from '../utils/productFiltersStore'

export const ResetFiltersButton = () => {
    const $filters = useStore(productFiltersStore)

    const handleResetFilters = () => {
        const searchParams = new URLSearchParams(window.location.search)
        
        searchParams.forEach((_, key) => {
            searchParams.delete(key)
        })

        const filters: Record<string, string> = {}

        searchParams.forEach((value, key) => {
            filters[key] = value
        })

        setProductFilters(filters)

        const newSearch = searchParams.toString()

        window.history.replaceState(null, "", newSearch ? `?${newSearch}` : window.location.pathname)
    }

    if (Object.keys($filters).length === 0) {
        return null
    }

    return (
        <button
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0 bg-neutral-100 text-black bg-white hover:bg-neutral-200 h-9 px-4 py-2 cursor-pointer"
            onClick={handleResetFilters}
        >
            Reset Filters
        </button>
    )
}
