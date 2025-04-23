import { FilteredProductsCount } from "./FilteredProductsCount";
import { ResetFiltersButton } from "./ResetFiltersButton";

export const GlobalStats = () => {
    return (
        <div className="flex gap-10 items-center w-full px-5 md:px-10 font-mono mb-5 h-10">
            <FilteredProductsCount />
            <ResetFiltersButton />
        </div>
    )
}
