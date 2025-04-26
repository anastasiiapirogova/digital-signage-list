import { useEffect, useState } from 'react'
import { filterProducts } from '../utils/filterProducts'
import { products } from '../utils/products'
import { ListItem } from './ListItem'
import type { Product } from './types'

export const FilteredList = ({ products }: { products: Product[] }) => {
    return (
        <div className='flex flex-col w-full gap-2'>
            {products.map((product) => (
                <ListItem product={product} key={product.id} />
            ))}
        </div>
    )
}
