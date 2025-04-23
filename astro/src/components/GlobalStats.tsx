import { FilteredProductsCount } from "./FilteredProductsCount";

export const GlobalStats = () => {
    return (
        <div className="flex gap-10 items-center justify-between w-full px-10 font-mono mb-5">
            <FilteredProductsCount />
        </div>
    )
}
