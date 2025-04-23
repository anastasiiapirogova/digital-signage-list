import { useEffect, useState } from 'react';
import { filterProducts } from '../utils/filterProducts';
import { products } from '../utils/products';
import { ListItem } from './ListItem';
import { useStore } from '@nanostores/react';
import { productFiltersStore, setProductFilters } from '../utils/productFiltersStore';

export const List = () => {
    const $filters = useStore(productFiltersStore);

    const [filteredProducts, setFilteredProducts] = useState(() =>
        filterProducts(products, $filters)
    );

    useEffect(() => {
        const newFilteredProducts = filterProducts(products, $filters);
        setFilteredProducts(newFilteredProducts);
    }, [$filters]);

    useEffect(() => {
        const filters: Record<string, string> = {};

        new URLSearchParams(window.location.search).forEach((value, key) => {
            filters[key] = value;
        });

        setProductFilters(filters);
    }, []);

    return (
        <div className='flex flex-col w-full gap-2'>
            {filteredProducts.map((product) => (
                <ListItem product={product} key={product.id} />
            ))}
        </div>
    );
};
