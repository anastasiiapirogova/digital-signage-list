import productsData from '../../../data/products.json';
import { ListItem } from './ListItem';
import type { Product } from './types';

export const List = () => {
    const products: Product[] = productsData;

    return (
        <div>
            <ul>
                {products.map((product) => (
                    <ListItem product={product} key={product.id} />
                ))}
            </ul>
        </div>
    );
};
