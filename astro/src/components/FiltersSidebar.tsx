import {
    PlatformFilter,
    OpenSourceFilter,
    HeadquartersFilter,
} from "../components";
import { PricingFilter } from "./PricingFilter";

export const FiltersSidebar = () => {
    return (
        <div className="w-[300px] flex flex-col gap-5 max-h-screen overflow-y-auto sticky top-0 scrollbar-thin p-5 bg-neutral-100">
            <PlatformFilter />
            <PricingFilter />
            <OpenSourceFilter />
            <HeadquartersFilter />
        </div>
    )
}
