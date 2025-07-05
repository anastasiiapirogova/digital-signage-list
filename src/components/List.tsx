import { useEffect, useRef, useState } from 'react'
import { filterProducts } from '../utils/filterProducts'
import { products } from '../utils/products'
import { ListItem } from './ListItem'
import { useStore } from '@nanostores/react'
import { productFiltersStore, setProductFilters } from '../utils/productFiltersStore'
import { productsStore, setProducts } from '../utils/productsStore'

export const List = () => {
    const $filters = useStore(productFiltersStore)
    const $products = useStore(productsStore)

    const [visibleCount, setVisibleCount] = useState(25)
    const loadMoreRef = useRef<HTMLButtonElement | null>(null)

    useEffect(() => {
        const newFilteredProducts = filterProducts(products, $filters)
        setVisibleCount(10)
        setProducts(newFilteredProducts)
    }, [$filters])

    useEffect(() => {
        const filters: Record<string, string> = {}

        new URLSearchParams(window.location.search).forEach((value, key) => {
            filters[key] = value
        })

        setProductFilters(filters)
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setVisibleCount((prev) => prev + 25)
                }
            },
            { threshold: 1.0 }
        )

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current)
        }

        return () => {
            if (loadMoreRef.current) {
                observer.unobserve(loadMoreRef.current)
            }
        }
    }, [visibleCount, $products.length])

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 25)
    }

    return (
        <div className='flex flex-col w-full gap-5'>
            {$products.slice(0, visibleCount).map((product) => (
                <ListItem product={product} key={product.id} />
            ))}
            {visibleCount < $products.length && (
                <button
                    ref={loadMoreRef}
                    onClick={handleLoadMore}
                    className='my-5 p-3 bg-neutral-200 hover:bg-neutral-300 rounded cursor-pointer transition-colors'
                >
                    Load More
                </button>
            )}
        </div>
    )
}
