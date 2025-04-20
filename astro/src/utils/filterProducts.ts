import type { Product } from "../components/types";

export const filterProducts = (products: Product[], filters: Record<string, string>) => {
    const filteredProducts = products.filter((product) => {
        const platforms = filters.platform;

        if (platforms && !product.supported_platforms.some((platform) => platforms.split(",").includes(platform))) {
            return false;
        }

        return true;
    });

    return filteredProducts;
};