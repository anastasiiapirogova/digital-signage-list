import {
    PlatformFilter,
    OpenSourceFilter,
    HeadquartersFilter,
} from "../components";
import { PricingFilter } from "./PricingFilter";

export const FiltersSidebar = () => {
    return (
        <>
            <PlatformFilter />
            <PricingFilter />
            <OpenSourceFilter />
            <HeadquartersFilter />
        </>
    )
}
