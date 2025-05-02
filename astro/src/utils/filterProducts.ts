import type { Product } from "../components/types";
import type { ProductsSortOption } from "./productsSortOptionStore";

export const filterProducts = (products: Product[], filters: Record<string, string>, sort: ProductsSortOption) => {
    const filteredProducts = products.filter((product) => {
        const platforms = filters.platform;
        const open_source = filters.open_source;
        const headquarters = filters.headquarters;
        const pricing_available = filters.pricing_available;
        const search = filters.search;

        if (platforms && !platforms.split(",").every((platform) => product.supported_platforms.includes(platform))) {
            return false;
        }

        const productHeadquarters = Array.isArray(product.headquarters) ? product.headquarters : [product.headquarters];

        if (headquarters && !headquarters.split(",").some((hq) => productHeadquarters.includes(hq))) {
            return false;
        }

        if (open_source && product.open_source !== (open_source === "true")) {
            return false;
        }

        if (pricing_available && product.pricing.pricing_available !== (pricing_available === "true")) {
            return false;
        }

        if (search) {
            const searchLower = search.toLowerCase();
            const nameMatch = product.name.toLowerCase().includes(searchLower);
            const websiteMatch = product.website.toLowerCase().includes(searchLower);
            const descriptionMatch = product.description.toLowerCase().includes(searchLower);

            if (!nameMatch && !descriptionMatch && !websiteMatch) {
                return false;
            }
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
    } else if (sortBy === "screens") {
        filteredProducts.sort((a, b) => {
            const screensA = a.stats.screens;
            const screensB = b.stats.screens;

            const screensAValue = screensA?.total ?? 0;
            const screensBValue = screensB?.total ?? 0;

            if (screensAValue < screensBValue) return sortOrder === "asc" ? -1 : 1;
            if (screensAValue > screensBValue) return sortOrder === "asc" ? 1 : -1;
            return 0;
        });
    }

    return filteredProducts;
};