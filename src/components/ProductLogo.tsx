import { useState, useEffect, useRef } from 'react'
import type { Product } from '../utils/productsSchema'

const FallbackLogo = ({ name }: { name: string }) => {
	return (
		<div className="aspect-square h-16 flex items-center justify-center rounded bg-neutral-200">
			<div className="text-3xl text-gray-400 font-mono font-bold">
				{name[0]}
			</div>
		</div>
	)
}

export const ProductLogo = ({ product }: { product: Product }) => {
	const [isLoading, setIsLoading] = useState(true)
	const [hasError, setHasError] = useState(false)
	const imgRef = useRef<HTMLImageElement>(null)

	useEffect(() => {
		const img = imgRef.current
		if (!img) return

		const handleLoad = () => {
			setIsLoading(false)
		}

		const handleError = () => {
			setHasError(true)
			setIsLoading(false)
		}

		img.addEventListener('load', handleLoad)
		img.addEventListener('error', handleError)

		return () => {
			img.removeEventListener('load', handleLoad)
			img.removeEventListener('error', handleError)
		}
	}, [product.id])

	if (!product.has_logo || hasError) {
		return <FallbackLogo name={product.name} />
	}

	return (
		<div className="relative aspect-square h-16">
			{isLoading && <FallbackLogo name={product.name} />}
			<img
				ref={imgRef}
				src={`/assets/logos/${product.id}.webp`}
				alt={product.name}
				loading="lazy"
				className="aspect-square h-16 object-cover rounded shrink-0"
			/>
		</div>
	)
}