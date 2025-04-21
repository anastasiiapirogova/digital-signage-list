import { TbCheck, TbX } from "react-icons/tb";
import type { Product } from "./types";

const Screens = ({ product }: { product: Product }) => {
    if (product.stats.screens) {
        return (
            <div className="w-[200px] flex items-center font-mono">
                {product.stats.screens.total.toLocaleString()}
            </div>
        );
    } else {
        return (
            <div className="text-gray-500 w-[200px] flex items-center font-mono">N/A</div>
        );
    }
}

export const ListItem = ({ product }: { product: Product }) => {
    return (
        <div className="hover:bg-neutral-100">
            <div className="flex w-full h-12">
                <div className="grow flex items-center">
                    {product.name}
                </div>
                <Screens product={product} />
                <div className="w-[200px] flex items-center">
                    {product.headquarters}
                </div>
                <div className="w-[100px] flex items-center">
                    {product.pricing.free_trial ? (
                        <div className="text-green-500 w-[200px] flex items-center">
                            <TbCheck size={20} />
                        </div>
                    ) : (
                        <div className="text-gray-500 w-[200px] flex items-center">
                            <TbX size={20} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
