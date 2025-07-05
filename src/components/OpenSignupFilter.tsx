import { useState, useEffect } from "react";
import { productFiltersStore, setProductFilters } from "../utils/productFiltersStore";
import { products } from "../utils/products";
import { useStore } from "@nanostores/react";

export const OpenSignupFilter = () => {
    const filters = useStore(productFiltersStore)
    const [signupType, setSignupType] = useState<string | null>(null);

    useEffect(() => {
        setSignupType(filters.self_signup ? filters.self_signup : "all");
    }, [filters]);

    const allCount = products.length;
    const openSignupCount = products.filter(product => product.self_signup === true).length;
    const contactRequiredCount = products.filter(product => product.self_signup === false).length;

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const selfSignup = searchParams.get("self_signup");

        if (selfSignup !== null) {
            setSignupType(selfSignup);
        }
    }, []);

    const handleSignupTypeChange = (value: string) => {
        setSignupType(value);

        const searchParams = new URLSearchParams(window.location.search);

        if (value === "all") {
            searchParams.delete("self_signup");
        } else {
            searchParams.set("self_signup", value);
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
            <h2>Signup process</h2>
            <div>
                <label className="flex items-center space-x-2 cursor-pointer hover:bg-neutral-50 p-2">
                    <input
                        type="radio"
                        name="signupType"
                        value="all"
                        checked={signupType === "all"}
                        onChange={() => handleSignupTypeChange("all")}
                        className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="text-gray-700">All {allCount}</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer hover:bg-neutral-50 p-2">
                    <input
                        type="radio"
                        name="signupType"
                        value="true"
                        checked={signupType === "true"}
                        onChange={() => handleSignupTypeChange("true")}
                        className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="text-gray-700">Open signup {openSignupCount}</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer hover:bg-neutral-50 p-2">
                    <input
                        type="radio"
                        name="signupType"
                        value="false"
                        checked={signupType === "false"}
                        onChange={() => handleSignupTypeChange("false")}
                        className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="text-gray-700">Contact required {contactRequiredCount}</span>
                </label>
            </div>
        </div>
    );
}; 