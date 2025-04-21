export const ListHeader = () => {
    return (
        <div className="flex w-full font-mono h-12 sticky top-0 bg-white z-10 border-b border-gray-200">
            <div className="flex-grow flex items-center">
                Name
            </div>
            <div className="w-[200px] flex items-center">
                Screens
            </div>
            <div className="w-[200px] flex items-center">
                HQ
            </div>
            <div className="w-[100px] flex items-center">
                Trial
            </div>
        </div>
    );
};
