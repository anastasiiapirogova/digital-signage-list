import { TbExternalLink, TbMapPin } from "react-icons/tb";
import type { Product } from "./types";
import { Badge } from "./Badge";

const FreeTrial = ({ product }: { product: Product }) => {
    if (product.pricing.free_trial) {
        return <Badge text="Free trial" />
    }

    return null
}

const OpenSource = ({ product }: { product: Product }) => {
    if (product.open_source) {
        return <Badge text="Open source" />
    }

    return <Badge text="Proprietary" />
}

const Pricing = ({ product }: { product: Product }) => {
    if (product.pricing.pricing_available) {
        return <Badge text="Public pricing" />
    }

    return <Badge text="Pricing on request" />
}

const Screens = ({ product }: { product: Product }) => {
    if (product.stats.screens && product.stats.screens.total) {
        return (
            <div className="flex items-center text-gray-500 font-mono">
                {product.stats.screens.total.toLocaleString()} screens
            </div>
        );
    }

    return null
}

export const ListItem = ({ product }: { product: Product }) => {
    return (
        <div className="hover:bg-neutral-100 md:rounded p-3 lg:p-5 group">
            <div className="flex gap-5 items-center">
                <div className="aspect-square h-14 md:h-20 flex items-center justify-center rounded bg-neutral-200">
                    <div className="text-3xl text-gray-400 font-mono font-bold">
                        { product.name[0] }
                    </div>
                </div>
                <div className="flex flex-col w-full gap-2 md:gap-3">
                    <div className="flex items-center justify-between w-full">
                        <div className="grow flex items-center font-medium gap-2 text-xl">
                            <div>
                                {product.name}
                            </div>
                            <a href={`${product.website}?ref=signagelist.org`} className="opacity-100 lg:opacity-0 group-hover:opacity-100 flex text-gray-400 hover:text-blue-600 transition-colors transition-opacity p-1" target="_blank" rel="noopener noreferrer">
                                <TbExternalLink size={20} />
                            </a>
                        </div>
                        <div>
                            <div className="flex gap-1 items-center text-gray-400">
                                {product.year_founded}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <div className="flex gap-5 items-center">
                            <div className="flex gap-1 items-center text-gray-400">
                                <TbMapPin size={20} />
                                <div>
                                    {product.headquarters}
                                </div>
                            </div>
                            <Screens product={product} />
                        </div>
                        <div className="gap-2 items-center hidden md:flex">
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
