import { TbArrowUp } from 'react-icons/tb';

export const ScrollToTopButton = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="p-2 rounded-full transition-all duration-300 ease-in-out bg-black/0 opacity-100 cursor-pointer hover:bg-black/90"
        >
            <TbArrowUp size={24} className='text-white'/>
        </button>
    );
};
