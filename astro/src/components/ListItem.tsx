import type { Product } from "./types";

const Screens = ({ product }: { product: Product }) => {
    if (product.stats.screens) {
        return (
            <div className="w-[200px] flex items-center">
                {product.stats.screens.total}
            </div>
        );
    } else {
        return (
            <div className="text-gray-500 w-[200px] flex items-center">N/A</div>
        );
    }
}

export const ListItem = ({ product }: { product: Product }) => {
    return (
        <div className="flex w-full h-12 hover:bg-neutral-100">
            <div className="grow flex items-center">
                {product.name}
            </div>
            <Screens product={product}/>
            <div className="w-[200px] flex items-center">
                {product.headquarters}
            </div>
        </div>
    );
};
