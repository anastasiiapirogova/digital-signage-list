import products from '../../../data/products.json';
import { ListItem } from './ListItem';

export const List = () => {
    return (
        <div>
            <ul>
                {products.map((product) => (
                    <ListItem product={product} key={product.id}/>
                ))}
            </ul>
        </div>
    );
};
