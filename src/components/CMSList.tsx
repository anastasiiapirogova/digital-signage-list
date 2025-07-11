import { useCallback, useMemo } from 'react'
import type { Product } from '../utils/productsSchema'
import { ProductLogo } from './ProductLogo'
import { useProducts } from '../hooks/useProducts'
import { VirtualizedTable } from './VirtualizedTable'
import type { ColumnDef } from '@tanstack/react-table'
import { cmsProductPricingSortingFn, getCMSProductPricingPreview } from '../utils/cmsProductPricing'

const useProductHelpers = () => {
	const getPricingDisplay = useCallback((product: Product) => getCMSProductPricingPreview(product), [])

	const getHeadquarters = useCallback((product: Product) => {	
		if (Array.isArray(product.headquarters)) {
			if (product.headquarters.length > 1) {
				return `${product.headquarters[0]} (+${product.headquarters.length - 1})`
			}
			return product.headquarters[0]
		}
		return product.headquarters
	}, [])

	const getScreensDisplay = useCallback((product: Product) => {
		const screensTotal = product.stats?.screens?.total
		if (screensTotal && typeof screensTotal === 'number') {
			return screensTotal
		}
		return '-'
	}, [])

	return { getPricingDisplay, getHeadquarters, getScreensDisplay }
}

const useTableColumns = () => {
	const { getPricingDisplay, getHeadquarters, getScreensDisplay } = useProductHelpers()

	return useMemo<ColumnDef<Product>[]>(
		() => [
			{
				header: 'Product',
				accessorKey: 'name',
				size: 500,
				sortingFn: 'alphanumeric',
				cell: ({ row }) => {
					const product = row.original
					return (
						<a
							href={product.website}
							target="_blank"
							rel="noopener nofollow ugc"
							className="flex items-center gap-3 group"
						>
							<ProductLogo product={product} />
							<div className="flex flex-col">
								<div className="flex items-center gap-2 font-medium text-gray-900 group-hover:text-blue-600">
									{product.name}
								</div>
								{product.description && (
									<div className="text-sm text-gray-500 mt-1 max-w-md">
										{product.description}
									</div>
								)}
							</div>
						</a>
					)
				},
			},
			{
				header: 'Pricing per screen',
				accessorFn: (row) => getPricingDisplay(row),
				size: 200,
				sortingFn: cmsProductPricingSortingFn,
				cell: ({ getValue }) => (
					<span className="text-sm text-gray-600">{getValue() as string}</span>
				),
			},
			{
				header: 'Signup',
				accessorFn: (row) => row.self_signup ? 'Self-signup' : 'On request',
				size: 150,
				cell: ({ getValue }) => (
					<span className="text-sm text-gray-600">{getValue() as string}</span>
				),
			},
			{
				header: 'Headquarters',
				accessorFn: (row) => getHeadquarters(row),
				size: 200,
				cell: ({ getValue }) => (
					<span className="text-sm text-gray-600">{getValue() as string}</span>
				),
			},
			{
				header: 'Screens',
				accessorFn: (row) => getScreensDisplay(row),
				size: 150,
				sortingFn: 'alphanumeric',
				cell: ({ getValue }) => (
					<span className="text-sm text-gray-600">{ `${(getValue() as number) > 0 ? (getValue() as number).toLocaleString() + '+' : '-'}` }</span>
				),
			},
		],
		[getPricingDisplay, getHeadquarters, getScreensDisplay]
	)
}

export const CMSList = () => {
	const products = useProducts()
	const columns = useTableColumns()

	return (
		<VirtualizedTable
			data={products}
			columns={columns}
			initialSorting={[{ id: 'name', desc: false }]}
		/>
	)
}