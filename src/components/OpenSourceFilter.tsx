import { useState, useEffect } from "react";
import { productFiltersStore, setProductFilters } from "../utils/productFiltersStore";
import { products } from "../utils/products";
import { useStore } from "@nanostores/react";

export const OpenSourceFilter = () => {
    const filters = useStore(productFiltersStore)
    const [sourceType, setSourceType] = useState<string | null>(null);

    useEffect(() => {
        setSourceType(filters.open_source ? filters.open_source : "all");
    }, [filters]);

    const allCount = products.length;
    const openSourceCount = products.filter(product => product.open_source === true).length;
    const proprietaryCount = products.filter(product => product.open_source === false).length;

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const openSource = searchParams.get("open_source");

        if (openSource !== null) {
            setSourceType(openSource);
        }
    }, []);

    const handleSourceTypeChange = (value: string) => {
        setSourceType(value);

        const searchParams = new URLSearchParams(window.location.search);

        if (value === "all") {
            searchParams.delete("open_source");
        } else {
            searchParams.set("open_source", value);
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
            <h2>Source Code</h2>
            <div>
                <label className="flex items-center space-x-2 cursor-pointer hover:bg-neutral-50 p-2">
                    <input
                        type="radio"
                        name="sourceType"
                        value="all"
                        checked={sourceType === "all"}
                        onChange={() => handleSourceTypeChange("all")}
                        className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="text-gray-700">All {allCount}</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer hover:bg-neutral-50 p-2">
                    <input
                        type="radio"
                        name="sourceType"
                        value="true"
                        checked={sourceType === "true"}
                        onChange={() => handleSourceTypeChange("true")}
                        className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="text-gray-700">Open Source {openSourceCount}</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer hover:bg-neutral-50 p-2">
                    <input
                        type="radio"
                        name="sourceType"
                        value="false"
                        checked={sourceType === "false"}
                        onChange={() => handleSourceTypeChange("false")}
                        className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="text-gray-700">Proprietary {proprietaryCount}</span>
                </label>
            </div>
        </div>
    );
};
