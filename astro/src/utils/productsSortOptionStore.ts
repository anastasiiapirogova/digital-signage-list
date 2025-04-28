import { atom } from 'nanostores';

export type ProductsSortOption = {
    sortBy: 'name' | 'shuffle';
    sortOrder: 'asc' | 'desc' | null;
}

export const productsSortOptionStore = atom<ProductsSortOption>({
    sortBy: 'name',
    sortOrder: 'asc',
})

export function setProductsSortOption(params: ProductsSortOption) {
    productsSortOptionStore.set(params)
}