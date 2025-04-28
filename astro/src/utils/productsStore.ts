import { atom } from 'nanostores';
import type { Product } from '../components/types';
import { products } from './products';

export const productsStore = atom<Product[]>(products)

export function setProducts(products: Product[]) {
    productsStore.set(products)
}