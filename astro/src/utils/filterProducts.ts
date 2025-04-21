import type { Product } from "../components/types";

export const filterProducts = (products: Product[], filters: Record<string, string>) => {
    const filteredProducts = products.filter((product) => {
        const platforms = filters.platform;
        const open_source = filters.open_source;
        const headquarters = filters.headquarters;

        if (platforms && !platforms.split(",").every((platform) => product.supported_platforms.includes(platform))) {
            return false;
        }

        if (headquarters && !headquarters.split(",").includes(product.headquarters)) {
            return false;
        }
        
        if (open_source && product.open_source !== (open_source === "true")) {
            return false;
        }

        return true;
    });

    return filteredProducts;
};