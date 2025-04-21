import { useState, useEffect } from "react";
import { products } from "../utils/products";
import { productFiltersStore, setProductFilters } from "../utils/productFiltersStore";
import { useStore } from "@nanostores/react";

export const HeadquartersFilter = () => {
    const filters = useStore(productFiltersStore);
    const [selectedHeadquarters, setSelectedHeadquarters] = useState<string[]>([]);

    useEffect(() => {
        setSelectedHeadquarters(filters.headquarters ? filters.headquarters.split(",") : []);
    }, [filters]);

    const headquartersCounts = products.reduce((acc, product) => {
        const headquarters = product.headquarters;
        if (headquarters) {
            acc[headquarters] = (acc[headquarters] || 0) + 1;
        }
        return acc;
    }, {} as Record<string, number>);

    const sortedHeadquarters = Object.entries(headquartersCounts).sort((a, b) => {
        if (b[1] === a[1]) {
            return a[0].localeCompare(b[0]);
        }
        return b[1] - a[1];
    });

    const handleHeadquartersChange = (headquarters: string, isChecked: boolean) => {
        const updatedHeadquarters = isChecked
            ? [...selectedHeadquarters, headquarters]
            : selectedHeadquarters.filter(h => h !== headquarters);

        setSelectedHeadquarters(updatedHeadquarters);

        const searchParams = new URLSearchParams(window.location.search);

        if (updatedHeadquarters.length > 0) {
            searchParams.set("headquarters", updatedHeadquarters.join(","));
        } else {
            searchParams.delete("headquarters");
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
            <h2>Headquarters</h2>
            {sortedHeadquarters.map(([headquarters, count]) => (
                <div key={headquarters}>
                    <label className="flex items-center space-x-2 cursor-pointer hover:bg-neutral-50 p-2">
                        <input
                            type="checkbox"
                            value={headquarters}
                            checked={selectedHeadquarters.includes(headquarters)}
                            onChange={(event) =>
                                handleHeadquartersChange(headquarters, event.target.checked)
                            }
                            className="form-checkbox h-4 w-4 text-blue-600"
                        />
                        <span className="text-gray-700">{headquarters}</span>
                        <span className="text-gray-400">{count}</span>
                    </label>
                </div>
            ))}
        </div>
    );
};
