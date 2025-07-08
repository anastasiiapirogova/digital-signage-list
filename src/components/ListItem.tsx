import { TbCurrencyDollar, TbRosetteDiscountCheckFilled, TbAlertTriangleFilled } from "react-icons/tb";
import type { Product } from "./types";
import { useCallback, useState } from "react";
import { appendUtm } from "../utils/appendUtm";

const Logo = ({ product }: { product: Product }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    if (!product.has_logo || hasError) {
        return (
            <div className="aspect-square h-16 md:h-24 flex items-center justify-center rounded bg-neutral-200">
                <div className="text-3xl text-gray-400 font-mono font-bold">
                    {product.name[0]}
                </div>
            </div>
        );
    }

    return (
        <div className="relative aspect-square h-16 md:h-24">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center rounded bg-neutral-200">
                    <div className="text-3xl text-gray-400 font-mono font-bold">
                        {product.name[0]}
                    </div>
                </div>
            )}
            <img
                src={`/assets/logos/${product.id}.webp`}
                alt={product.name}
                loading="lazy"
                className="aspect-square h-16 md:h-24 object-cover rounded shrink-0"
                onLoad={() => setIsLoading(false)}
                onError={() => setHasError(true)}
            />
        </div>
    )
}

export const ListItem = ({ product }: { product: Product }) => {
    const appendUTM = useCallback((url: string) => {
        return appendUtm(url, product.is_sponsor);
    }, [product.website, product.is_sponsor])

    const getPricingTier = (): number => {
        const tier = product.pricing.tier;
        if (!tier) return 0;

        const tierLevels = {
            affordable: 1,
            midRange: 2,
            premium: 3,
        } as const;

        return tierLevels[tier as keyof typeof tierLevels] || 0;
    };

    const getPricingDisplay = () => {
        if (!product.pricing.pricing_available) {
            return "Pricing on request";
        }
        return null;
    };

    const getHeadquarters = () => {
        if (Array.isArray(product.headquarters)) {
            return product.headquarters.join(", ");
        }
        return product.headquarters;
    };

    const getScreensDisplay = () => {
        const screensTotal = product.stats.screens?.total;
        if (screensTotal && typeof screensTotal === 'number') {
            return `${screensTotal.toLocaleString()}+ screens`;
        }
        return null;
    };

    return (
        <a
            href={appendUTM(product.website)}
            className="bg-white rounded-3xl p-5 md:p-7 group" target="_blank"
            rel="noopener nofollow ugc"
            aria-label={`Visit ${product.name} website`}
        >
            <div className="flex gap-5 md:gap-7 items-center">
                <Logo product={product} />
                <div className="flex flex-col w-full">
                    <div className="flex items-center justify-between w-full">
                        <div className="grow flex items-center font-medium gap-2 md:text-xl">
                            <div>
                                {product.name}
                            </div>
                            {product.is_sponsor && (
                                <div className="flex gap-1 p-1 rounded-full px-2 pr-2.5 items-center bg-blue-50 group-hover:bg-blue-100">
                                    <TbRosetteDiscountCheckFilled size={20} className="text-blue-600" />
                                    <span className="text-sm text-blue-600 leading-1">
                                        Sponsor
                                    </span>
                                </div>
                            )}
                            {product.discontinued && (
                                <div className="flex gap-1 p-1 rounded-full px-2 pr-2.5 items-center bg-orange-50 group-hover:bg-orange-100 ml-2">
                                    <TbAlertTriangleFilled size={20} className="text-orange-600" />
                                    <span className="text-sm text-orange-700 leading-1">
                                        Discontinued
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                        {product.description}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3 mb-1">
                        {Array.isArray(product.categories) && product.categories.length > 0 &&
                            product.categories.map((cat) => (
                                <span
                                    key={cat}
                                    className="inline-block bg-green-100 text-green-800 text-xs md:text-sm font-semibold px-2 py-0.5 rounded-full border border-green-200"
                                >
                                    {cat}
                                </span>
                            ))
                        }
                        {getPricingTier() > 0 && (
                            <span className="bg-purple-100 text-purple-800 text-xs md:text-sm font-semibold px-2 py-0.5 rounded-full border border-purple-200 flex items-center shink-0">
                                {[...Array(3)].map((_, i) => (
                                    <TbCurrencyDollar
                                        key={i}
                                        size={12}
                                        className={i < getPricingTier() ? "text-purple-800" : "text-purple-300"}
                                    />
                                ))}
                            </span>
                        )}
                        {getPricingDisplay() && (
                            <span className="inline-block bg-purple-100 text-purple-800 text-xs md:text-sm font-semibold px-2 py-0.5 rounded-full border border-purple-200">
                                {getPricingDisplay()}
                            </span>
                        )}
                        {getHeadquarters() && (
                            <span className="inline-block bg-blue-100 text-blue-800 text-xs md:text-sm font-semibold px-2 py-0.5 rounded-full border border-blue-200">
                                {getHeadquarters()}
                            </span>
                        )}
                        {getScreensDisplay() && (
                            <span className="inline-block bg-gray-100 text-gray-800 text-xs md:text-sm font-semibold px-2 py-0.5 rounded-full border border-gray-200">
                                {getScreensDisplay()}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </a>
    );
};
