import { useDeferredValue, useEffect } from 'react'
import { filterProducts } from '../utils/filterProducts'
import { products } from '../utils/products'
import { ListItem } from './ListItem'
import { useStore } from '@nanostores/react'
import { productFiltersStore, setProductFilters } from '../utils/productFiltersStore'
import { productsSortOptionStore } from '../utils/productsSortOptionStore'
import { productsStore, setProducts } from '../utils/productsStore'

export const List = () => {
    const $filters = useStore(productFiltersStore)
    const $sort = useStore(productsSortOptionStore)
    const $products = useStore(productsStore)

    const deferredSort = useDeferredValue($sort);

    useEffect(() => {
        const newFilteredProducts = filterProducts(products, $filters, deferredSort)
        setProducts(newFilteredProducts)
    }, [$filters, deferredSort])

    useEffect(() => {
        const filters: Record<string, string> = {}

        new URLSearchParams(window.location.search).forEach((value, key) => {
            filters[key] = value
        })

        setProductFilters(filters)
    }, [])

    return (
        <div className='flex flex-col w-full gap-2'>
            {$products.map((product) => (
                <ListItem product={product} key={product.id} />
            ))}
        </div>
    )
}
