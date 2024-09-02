import { Dispatch, SetStateAction } from "react";

interface HeaderProps {
    searchInput: string;
    setSearchInput: Dispatch<SetStateAction<string>>;
    showFavorites: boolean;
    handleShowFavorites: () => void;
}

export default function Header({
    searchInput,
    setSearchInput,
    showFavorites,
    handleShowFavorites,
}: HeaderProps) {
    return (
        <header className="search-bar">
            <input
                type="text"
                placeholder="Search..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />
            <div className={`favorites-icon ${showFavorites ? "active" : ""}`} onClick={handleShowFavorites}></div>
        </header>
    );
}
