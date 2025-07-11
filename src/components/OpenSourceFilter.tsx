import { useStore } from '@nanostores/react'
import { productFilters, setShowOpenSource, setShowProprietary } from '../stores/productFilters'

export const OpenSourceFilter = () => {
	const filters = useStore(productFilters)

	return (
		<div className="flex gap-4 items-center select-none">
			<label className="flex items-center gap-2 cursor-pointer">
				<input
					type="checkbox"
					checked={filters.showOpenSource}
					onChange={e => setShowOpenSource(e.target.checked)}
					className="accent-blue-500"
				/>
				<span>Open Source</span>
			</label>
			<label className="flex items-center gap-2 cursor-pointer">
				<input
					type="checkbox"
					checked={filters.showProprietary}
					onChange={e => setShowProprietary(e.target.checked)}
					className="accent-blue-500"
				/>
				<span>Proprietary</span>
			</label>
		</div>
	)
}