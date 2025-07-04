import { useState, useEffect } from "react";
import { productFiltersStore, setProductFilters } from "../utils/productFiltersStore";
import { useStore } from "@nanostores/react";

export const SearchFilter = () => {
    const filters = useStore(productFiltersStore);
    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
        setSearchQuery(filters.search || "");
    }, [filters]);

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);

        const searchParams = new URLSearchParams(window.location.search);

        if (query) {
            searchParams.set("search", query);
        } else {
            searchParams.delete("search");
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
        <div className="">
            <input
                type="text"
                value={searchQuery}
                onChange={(event) => handleSearchChange(event.target.value)}
                placeholder="Search products..."
                className="form-input text-lg w-full px-5 py-2 border border-gray-300 rounded-full focus:outline-none"
            />
        </div>
    );
};
