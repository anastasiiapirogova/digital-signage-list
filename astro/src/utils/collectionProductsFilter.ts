import type { Product } from "../components/types";

type Filter = {
    field?: string;
    has?: string[] | string;
    is?: boolean | string | null | number
};

export const collectionProductsFilter = (products: Product[], filters: Filter[]) => {
    return filters.reduce((filteredProducts, filter) => {
        if (filter.field === "supported_platforms") {
            return filteredProducts.filter((product) => {
                if(!filter.has) {
                    return false
                }
                const platforms = Array.isArray(filter.has) ? filter.has : [filter.has];
                return platforms.every((platform: string) => product.supported_platforms.includes(platform));
            });
        }

        if(filter.field === "pricing.has_freemium") {
            return filteredProducts.filter((product) => {
                if(filter.is === undefined) {
                    return false
                }
                
                return product.pricing.has_freemium === (filter.is === "true" || filter.is === true) || product.open_source === (filter.is === "true" || filter.is === true);
            });
        }

		if(filter.field === "open_source") {
            return filteredProducts.filter((product) => {
                if(filter.is === undefined) {
                    return false
                }

                return product.open_source === (filter.is === "true" || filter.is === true);
            });
        }
        return filteredProducts;
    }, products);
};
