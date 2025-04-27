import { useEffect, useState } from 'react';
import { TbArrowUp } from 'react-icons/tb';

export const ScrollToTopButton = () => {
    const [isDisabled, setIsDisabled] = useState(true);

    const handleScroll = () => {
        if (window.scrollY > 300) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <button
            onClick={scrollToTop}
            disabled={isDisabled}
            aria-label="Scroll to top"
            className={
            'p-2 rounded-full transition-all duration-300 ease-in-out bg-black/0' +
            (!isDisabled ? 'opacity-100 cursor-pointer hover:bg-black/90' : ' opacity-20 pointer-events-none')
            }
        >
            <TbArrowUp size={24} className='text-white'/>
        </button>
    );
};
