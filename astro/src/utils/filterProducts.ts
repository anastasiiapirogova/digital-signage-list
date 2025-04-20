import type { Product } from "../components/types";

export const filterProducts = (products: Product[], filters: Record<string, string>) => {
    const filteredProducts = products.filter((product) => {
        const platforms = filters.platform;

        if (platforms && !platforms.split(",").every((platform) => product.supported_platforms.includes(platform))) {
            return false;
        }

        return true;
    });

    return filteredProducts;
};