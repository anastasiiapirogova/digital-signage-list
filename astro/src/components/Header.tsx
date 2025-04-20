import githubLogo from "../assets/github-mark.svg";

export const Header = () => {
    return (
        <header className="border-b border-neutral-200 py-4">
            <div className="container mx-auto flex justify-between items-center font-mono">
                <h1>Digital Signage List</h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <a href="https://github.com/514sid/digital-signage-list/issues" target="_blank" rel="noopener noreferrer" className="hover:underline">
                                Suggest a product
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/514sid/digital-signage-list" target="_blank" rel="noopener noreferrer">
                                <img src={githubLogo.src} alt="GitHub" className="h-6 w-6 opacity-50 hover:opacity-100 transition-opacity"/>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};
