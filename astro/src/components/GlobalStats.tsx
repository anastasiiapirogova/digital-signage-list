import { FilteredProductsCount } from "./FilteredProductsCount";
import { ResetFiltersButton } from "./ResetFiltersButton";
import { SortOptions } from "./SortOptions";

export const GlobalStats = () => {
    return (
        <div className="flex items-center justify-between w-full px-5 md:px-10 font-mono mb-5 h-10">
            <div className="flex gap-10 items-center">
                <FilteredProductsCount />
                <ResetFiltersButton />
            </div>
            <SortOptions />
        </div>
    )
}
