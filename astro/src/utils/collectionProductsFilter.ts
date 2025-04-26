import type { Product } from "../components/types";

type Filter = {
    field?: string
    has?: string[] | string
}

export const collectionProductsFilter = (products: Product[], filter: any) => {
    if(filter.field === "supported_platforms") {
        return products.filter((product) => {
            const platforms = Array.isArray(filter.has) ? filter.has : [filter.has];
            if (platforms && !platforms.every((platform: string) => product.supported_platforms.includes(platform))) {
                return false;
            }
            return true;
        });
    }

    return products
}