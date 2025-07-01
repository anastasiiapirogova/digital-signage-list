import { atom } from 'nanostores';

export const productFiltersStore = atom<Record<string, string>>({});

export function setProductFilters(params: Record<string, string>) {
    productFiltersStore.set(params);
}