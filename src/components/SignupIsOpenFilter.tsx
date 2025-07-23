import { useStore } from '@nanostores/react'
import { productFilters, setSignupIsOpenOnly } from '../stores/productFilters'

export const SignupIsOpenFilter = () => {
	const filters = useStore(productFilters)

	return (
		<div className="flex gap-4 items-center select-none">
			<label className="flex items-center gap-2 cursor-pointer">
				<input
					type="checkbox"
					checked={filters.signupIsOpenOnly}
					onChange={e => setSignupIsOpenOnly(e.target.checked)}
					className="accent-blue-500"
				/>
				<span>Signup is open</span>
			</label>
		</div>
	)
} 