import { TbBrandX, TbPlus } from "react-icons/tb";
import githubLogo from "../assets/github-mark.svg";

export const Header = () => {
    return (
        <header className="border-b border-neutral-200 py-4 px-5 md:px-10 sticky top-0 bg-white z-10">
            <div className="flex justify-between items-center font-mono">
                <h1>signagelist</h1>
                <nav>
                    <ul className="flex space-x-4 items-center">
                        <li>
                            <a href="https://github.com/514sid/digital-signage-list/issues" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0 bg-black text-white shadow hover:bg-black/90 h-9 px-4 py-2 md:pr-5">
                                <TbPlus size={20}/>
                                <div className="hidden md:inline-flex">
                                    Submit a product
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="https://x.com/whois514" target="_blank" rel="noopener noreferrer">
                                <TbBrandX className="h-6 w-6 opacity-50 hover:opacity-100 transition-opacity"/>
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/514sid/digital-signage-list" target="_blank" rel="noopener noreferrer">
                                <img src={githubLogo.src} alt="GitHub" className="h-6 w-6 opacity-50 hover:opacity-100 transition-opacity" />
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};
