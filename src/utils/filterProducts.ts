import type { Product } from "../components/types";

export const filterProducts = (products: Product[], filters: Record<string, string>) => {
    const filteredProducts = products.filter((product) => {
        const platforms = filters.platform;
        const open_source = filters.open_source;
        const self_signup = filters.self_signup;
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

        if (self_signup && product.self_signup !== (self_signup === "true")) {
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


    filteredProducts.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();

        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
    });

    return filteredProducts;
};