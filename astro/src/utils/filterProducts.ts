import type { Product } from "../components/types";
import type { ProductsSortOption } from "./productsSortOptionStore";

export const filterProducts = (products: Product[], filters: Record<string, string>, sort: ProductsSortOption) => {
    const filteredProducts = products.filter((product) => {
        const platforms = filters.platform;
        const open_source = filters.open_source;
        const headquarters = filters.headquarters;
        const pricing_available = filters.pricing_available;

        if (platforms && !platforms.split(",").every((platform) => product.supported_platforms.includes(platform))) {
            return false;
        }

        if (headquarters && !headquarters.split(",").includes(product.headquarters)) {
            return false;
        }

        if (open_source && product.open_source !== (open_source === "true")) {
            return false;
        }

        if (pricing_available && product.pricing.pricing_available !== (pricing_available === "true")) {
            return false;
        }

        return true;
    });

    const sortBy = sort.sortBy;
    const sortOrder = sort.sortOrder;

    if (sortBy === "name") {
        filteredProducts.sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();

            if (nameA < nameB) return sortOrder === "asc" ? -1 : 1;
            if (nameA > nameB) return sortOrder === "asc" ? 1 : -1;
            return 0;
        });
    } else if (sortBy === "shuffle") {
        filteredProducts.sort(() => Math.random() - 0.5);
    }

    return filteredProducts;
};