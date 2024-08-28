import "./App.css";
import { ApiData, getPirates } from "./data/data";
import { useEffect, useState } from "react";

function App() {
    const [characters, setCharacters] = useState<ApiData[]>([]);
    const [searchInput, setSearchInput] = useState<string>("");
    const [likedCharacters, setLikedCharacters] = useState<boolean[]>([]);
    const [favorites, setFavorites] = useState<ApiData[]>([]);
    const [showFavorites, setShowFavorites] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data: ApiData[] = await getPirates();
                console.log("Data from API:", data);
                setCharacters(data);
                setLikedCharacters(new Array(data.length).fill(false));
            } catch (error) {
                console.log("API failed with error: ", error.message);
            }
        };
        fetchData();
    }, []);

    const handleShowFavorites = (): void => {
        setShowFavorites((prevShowFavorites) => !prevShowFavorites);
    };

    const handleLike = (index: number) => {
        setLikedCharacters((prevLikedCharacters) => {
            const newLikedCharacters = [...prevLikedCharacters];
            newLikedCharacters[index] = !newLikedCharacters[index];

            setFavorites((prevFavorites) => {
                const character = characters[index];
                if (newLikedCharacters[index]) {
                    if (
                        !prevFavorites.some(
                            (fav) => fav.title === character.title
                        )
                    ) {
                        return [...prevFavorites, character];
                    }
                } else {
                    return prevFavorites.filter(
                        (fav) => fav.title !== character.title
                    );
                }
                return prevFavorites;
            });

            return newLikedCharacters;
        });
    };

    const filteredCharacters = characters.filter((character) =>
        character.title.toLowerCase().includes(searchInput.toLowerCase())
    );

    const sortedCharacters = filteredCharacters.sort((a, b) =>
        a.release_date > b.release_date
            ? 1
            : a.release_date < b.release_date
            ? -1
            : 0
    );

    return (
        <div className="app">
            <header>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search..."
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <div
                        className="favorites-icon"
                        onClick={handleShowFavorites}
                    ></div>
                </div>
            </header>
            <main>
                <div className="grid">
                    {(showFavorites ? favorites : sortedCharacters).map(
                        (character, index) => (
                            <div className="character-card" key={index}>
                                <div className="flip-card">
                                    <div className="flip-card-inner">
                                        <div className="flip-card-front">
                                            <img
                                                src={character.image}
                                                alt={character.title}
                                                className="character-image"
                                            />
                                        </div>
                                        <div className="flip-card-back">
                                            <h3>{character.title}</h3>
                                            <p className="p-minor">
                                                {character.director}
                                            </p>
                                            <div className="character-details">
                                                <p>{character.description}</p>
                                            </div>
                                            <div className="character-stats">
                                                <p>{character.rt_score}/100</p>
                                                <p>{character.release_date}</p>
                                            </div>
                                            <div
                                                className={`like-button-container ${
                                                    likedCharacters[index]
                                                        ? "liked"
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    handleLike(index)
                                                }
                                            >
                                                <div className="heart-bg">
                                                    <div
                                                        className={`heart-icon ${
                                                            likedCharacters[
                                                                index
                                                            ]
                                                                ? "liked"
                                                                : ""
                                                        }`}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </main>
        </div>
    );
}

export default App;
