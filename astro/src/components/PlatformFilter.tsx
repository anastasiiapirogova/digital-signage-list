import { useState, useEffect } from "react";
import { products } from "../utils/products";
import { setProductFilters } from "../utils/productFiltersStore";

export const PlatformFilter = () => {
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const platforms = searchParams.get("platform");
        if (platforms) {
            setSelectedPlatforms(platforms.split(","));
        }
    }, []);

    const platformCounts = products.reduce((acc, product) => {
        product.supported_platforms.forEach(platform => {
            acc[platform] = (acc[platform] || 0) + 1;
        });
        return acc;
    }, {} as Record<string, number>);

    const sortedPlatforms = Object.entries(platformCounts).sort((a, b) => {
        if (b[1] === a[1]) {
            return a[0].localeCompare(b[0]);
        }
        return b[1] - a[1];
    });

    const handlePlatformChange = (platform: string, isChecked: boolean) => {
        const updatedPlatforms = isChecked
            ? [...selectedPlatforms, platform]
            : selectedPlatforms.filter(p => p !== platform);

        setSelectedPlatforms(updatedPlatforms);

        const searchParams = new URLSearchParams(window.location.search);
        if (updatedPlatforms.length > 0) {
            searchParams.set("platform", updatedPlatforms.join(","));
        } else {
            searchParams.delete("platform");
        }

        const filters: Record<string, string> = {};

        searchParams.forEach((value, key) => {
            filters[key] = value;
        })

        setProductFilters(filters)
        
        window.history.replaceState(null, "", `?${searchParams.toString()}`);
    };

    return (
        <div>
            <h2>Supported Platform</h2>
            {sortedPlatforms.map(([platform, count]) => (
                <div key={platform}>
                    <label className="flex items-center space-x-2 cursor-pointer hover:bg-neutral-50 p-2">
                        <input
                            type="checkbox"
                            value={platform}
                            checked={selectedPlatforms.includes(platform)}
                            onChange={(event) =>
                                handlePlatformChange(platform, event.target.checked)
                            }
                            className="form-checkbox h-4 w-4 text-blue-600"
                        />
                        <span className="text-gray-700">{platform}</span>
                    <span className="text-gray-400">{count}</span>
                    </label>
                </div>
            ))}
        </div>
    );
};
