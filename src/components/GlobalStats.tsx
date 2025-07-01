import { FilteredProductsCount } from "./FilteredProductsCount";
import { ResetFiltersButton } from "./ResetFiltersButton";
import { SortOptions } from "./SortOptions";

export const GlobalStats = () => {
    return (
        <div className="flex flex-col gap-5 md:gap-0 md:flex-row md:items-center md:justify-between w-full px-5 md:px-10 font-mono mb-5 min-h-10">
            <div className="flex gap-10 items-center">
                <FilteredProductsCount />
                <ResetFiltersButton />
            </div>
            <div>
                <SortOptions />
            </div>
        </div>
    )
}
