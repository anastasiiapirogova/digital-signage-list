import { ListItem } from './ListItem'
import type { Product } from './types'

export const FilteredList = ({ products }: { products: Product[] }) => {
    return (
        <div className='flex flex-col w-full gap-5'>
            {products.map((product) => (
                <ListItem product={product} key={product.id} />
            ))}
        </div>
    )
}
