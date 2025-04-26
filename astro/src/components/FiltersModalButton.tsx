import { TbFilter, TbX } from "react-icons/tb";
import {
    PlatformFilter,
    OpenSourceFilter,
    HeadquartersFilter,
} from ".";
import { PricingFilter } from "./PricingFilter";
import { Dialog } from "radix-ui";

const ModalBody = () => {
    return (
        <Dialog.Content className="fixed flex flex-col left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-[25px] shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-contentShow z-20">
            <Dialog.Title className="m-0 text-[17px] font-medium text-mauve12">
                Filters
            </Dialog.Title>
            <Dialog.Description className="mb-5 mt-2.5 text-[15px] leading-normal text-mauve11">
                Use the filters below to narrow down the list of digital signage software based on your preferences.
            </Dialog.Description>
            <div className="flex flex-col gap-4 grow overflow-y-auto">
                <PlatformFilter />
                <PricingFilter />
                <OpenSourceFilter />
                <HeadquartersFilter />
            </div>
            <div className="mt-[25px] flex justify-end">
                <Dialog.Close asChild>
                    <button className="inline-flex h-[35px] items-center justify-center rounded bg-black text-white px-[15px] leading-none text-green11 outline-none outline-offset-1 hover:bg-green5 focus-visible:outline-2 focus-visible:outline-green6 select-none cursor-pointer">
                        Close
                    </button>
                </Dialog.Close>
            </div>
        </Dialog.Content>
    )
}

export const FiltersModalButton = () => {
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <button
                    className={
                        'p-2 rounded-full duration-300 ease-in-out bg-black/0 cursor-pointer hover:bg-black/90 text-white transition-all flex gap-2 items-center px-3'
                    }
                >
                    <TbFilter size={20} color="#fff" />
                    Filters
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-20 bg-black/60 data-[state=open]:animate-overlayShow" />
                <ModalBody />
            </Dialog.Portal>
        </Dialog.Root >
    )
}
