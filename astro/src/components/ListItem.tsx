import { TbCoin, TbCurrencyDollar, TbExternalLink, TbMapPin } from "react-icons/tb";
import type { Product } from "./types";
import { Badge } from "./Badge";

const FreeTrial = ({ product }: { product: Product }) => {
    if (product.pricing.free_trial) {
        return <Badge text="Free trial" />
    }

    return null
}

const PricingTier = ({ product }: { product: Product }) => {
    const tierLevels = {
        affordable: 1,
        midRange: 2,
        premium: 3,
    } as const;

    const tier = product.pricing.tier;
    const filledCount = tier ? tierLevels[tier as keyof typeof tierLevels] : 0;

    if (!filledCount) return null;

    return (
        <div className="flex items-center">
            {[...Array(3)].map((_, i) => (
                <TbCurrencyDollar
                    key={i}
                    size={16}
                    className={i < filledCount ? "text-blue-600" : "text-neutral-400"}
                />
            ))}
        </div>
    );
};

const OpenSource = ({ product }: { product: Product }) => {
    if (product.open_source) {
        return <Badge text="Open source" />
    }

    return null
}

const Pricing = ({ product }: { product: Product }) => {
    if (product.pricing.pricing_available) {
        return <Badge text="Public pricing" />
    }
    if (!product.open_source) {
        return <Badge text="Pricing on request" />
    }
}

const Screens = ({ product }: { product: Product }) => {
    if (product.stats.screens && product.stats.screens.total) {
        return (
            <div className="flex items-center text-gray-500 font-mono">
                {product.stats.screens.total.toLocaleString()}+ screens
            </div>
        );
    }

    return (
        <div className="-mr-5"></div>
    )
}

const Discontinued = ({ product }: { product: Product }) => {
    const isDiscontinued = product.discontinued || false;

    if (isDiscontinued) {
        return (
            <div className="text-orange-500 text-sm">
                Discontinued
            </div>
        );
    }
    
    return null
}

const Logo = ({ product }: { product: Product }) => {
    if (!product.has_logo) {
        return (
            <div className="aspect-square h-16 md:h-24 flex items-center justify-center rounded bg-neutral-200">
                <div className="text-3xl text-gray-400 font-mono font-bold">
                    {product.name[0]}
                </div>
            </div>
        );
    }

    return (
        <img
            src={`/assets/logos/${product.id}.png`}
            alt={product.name}
            className="aspect-square h-16 md:h-24 object-cover rounded shrink-0"
        />
    )
}

export const ListItem = ({ product }: { product: Product }) => {    
    return (
        <div className="hover:bg-neutral-100 md:rounded p-3 lg:p-5 group">
            <div className="flex gap-3 md:gap-5 items-center">
                <Logo product={product} />
                <div className="flex flex-col w-full gap-1 md:gap-3">
                    <div className="flex items-center justify-between w-full">
                        <div className="grow flex items-center font-medium gap-2 md:text-xl">
                            <div>
                                {product.name}
                            </div>
                            <a
                                href={`${product.website}?ref=signagelist.org`}
                                className="opacity-100 lg:opacity-0 group-hover:opacity-100 flex text-gray-400 hover:text-blue-600 transition-colors transition-opacity p-1"
                                target="_blank"
                                rel="noopener nofollow ugc"
                                aria-label={`Visit ${product.name} website`}
                            >
                                <TbExternalLink size={20} />
                            </a>
                        </div>
                        <div>
                            {
                                product.year_founded && (
                                    <div className="flex gap-1 items-center text-gray-400">
                                        {product.year_founded}
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col items-start md:flex-row gap-1 md:gap-5 md:items-center w-full">
                            <div className="flex gap-1 items-center text-gray-400 text-sm md:text-base shrink-0">
                                <TbMapPin className="w-4 h-4 md:w-5 md:h-5" />
                                <div>
                                    {product.headquarters}
                                </div>
                            </div>
                            <div className="flex gap-1 items-center text-gray-400 text-sm md:text-base w-full justify-between md:justify-start md:gap-5">
                                <Screens product={product} />
                                <Discontinued product={product} />
                                <PricingTier product={product} />
                            </div>
                        </div>
                        <div className="gap-2 items-center hidden md:flex shrink-0">
                            <FreeTrial product={product} />
                            <Pricing product={product} />
                            <OpenSource product={product} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
