import { useState, useEffect } from "react";
import { productFiltersStore, setProductFilters } from "../utils/productFiltersStore";
import { products } from "../utils/products";
import { useStore } from "@nanostores/react";

export const PricingFilter = () => {
    const filters = useStore(productFiltersStore)
    const [pricingType, setPricingType] = useState<string | null>(null);

    useEffect(() => {
        setPricingType(filters.pricing_available ? filters.pricing_available : "all");
    }, [filters]);

    const allCount = products.length;
    const openSourceCount = products.filter(product => product.pricing.pricing_available === true).length;
    const proprietaryCount = products.filter(product => product.pricing.pricing_available === false).length;

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const openSource = searchParams.get("pricing_available");

        if (openSource !== null) {
            setPricingType(openSource);
        }
    }, []);

    const handlePricingTypeChange = (value: string) => {
        setPricingType(value);

        const searchParams = new URLSearchParams(window.location.search);

        if (value === "all") {
            searchParams.delete("pricing_available");
        } else {
            searchParams.set("pricing_available", value);
        }

        const filters: Record<string, string> = {};

        searchParams.forEach((value, key) => {
            filters[key] = value;
        });

        setProductFilters(filters);

        const newSearch = searchParams.toString();

        window.history.replaceState(null, "", newSearch ? `?${newSearch}` : window.location.pathname);
    };

    return (
        <div>
            <h2>Pricing</h2>
            <div>
                <label className="flex items-center space-x-2 cursor-pointer hover:bg-neutral-50 p-2">
                    <input
                        type="radio"
                        name="pricingType"
                        value="all"
                        checked={pricingType === "all"}
                        onChange={() => handlePricingTypeChange("all")}
                        className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="text-gray-700">All {allCount}</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer hover:bg-neutral-50 p-2">
                    <input
                        type="radio"
                        name="pricingType"
                        value="true"
                        checked={pricingType === "true"}
                        onChange={() => handlePricingTypeChange("true")}
                        className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="text-gray-700">Public {openSourceCount}</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer hover:bg-neutral-50 p-2">
                    <input
                        type="radio"
                        name="pricingType"
                        value="false"
                        checked={pricingType === "false"}
                        onChange={() => handlePricingTypeChange("false")}
                        className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="text-gray-700">On request {proprietaryCount}</span>
                </label>
            </div>
        </div>
    );
};
