import { FiltersModalButton } from "./FiltersModalButton"
import { ScrollToTopButton } from "./ScrollToTopButton"

export const BottomMenu = () => {
    return (
        <div className="fixed bottom-6 left-0 right-0 z-10 flex items-center justify-around">
            <div className="p-1 md:p-2 px-4 bg-black/40 rounded-full flex items-center gap-3 backdrop-blur">
                <FiltersModalButton />
                <ScrollToTopButton />
            </div>
        </div>
    )
}
