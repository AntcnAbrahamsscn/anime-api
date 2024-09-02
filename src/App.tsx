import "./App.css";
import "./header.css";
import { ApiData, getMovies } from "./data/data";
import { useEffect, useState } from "react";
import Header from "./Header";
import Card from "./Card";

function App() {
    const [characters, setCharacters] = useState<ApiData[]>([]);
    const [searchInput, setSearchInput] = useState<string>("");
    const [favorites, setFavorites] = useState<ApiData[]>([]);
    const [showFavorites, setShowFavorites] = useState<boolean>(false);
    const [flippedCharacters, setFlippedCharacters] = useState<boolean[]>([]);
    const [checkedStates, setCheckedStates] = useState<{ [title: string]: boolean }>({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data: ApiData[] = await getMovies();
                console.log("Data from API:", data);
                setCharacters(data);
                setFlippedCharacters(new Array(data.length).fill(false));
            } catch (error) {
                console.log("API failed with error: ", error.message);
            }
        };
        fetchData();
    }, []);

    const handleShowFavorites = (): void => {
        setShowFavorites((prevShowFavorites) => !prevShowFavorites);
        setFlippedCharacters(new Array(characters.length).fill(false)); 
    };

    const handleLike = (character: ApiData) => {
        setFavorites((prevFavorites) => {
            if (prevFavorites.some((fav) => fav.title === character.title)) {
                return prevFavorites.filter(
                    (fav) => fav.title !== character.title
                );
            } else {
                return [...prevFavorites, character];
            }
        });
    };

    const handleFlip = (index: number) => {
        setFlippedCharacters((prevFlippedCharacters) =>
            prevFlippedCharacters.map((flipped, i) => i === index ? !flipped : false)
        );
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

    const handleCheckToggle = (title: string) => {
        setCheckedStates((prevCheckedStates) => ({
            ...prevCheckedStates,
            [title]: !prevCheckedStates[title],
        }));
    };

    return (
        <div className="app">
            <Header
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                showFavorites={showFavorites}
                handleShowFavorites={handleShowFavorites}
            />
            <main>
                <div className="grid">
                    {(showFavorites ? favorites : sortedCharacters).map(
                        (character, index) => (
                            <Card
                                key={character.title}
                                character={character}
                                isFlipped={flippedCharacters[index]}
                                isLiked={favorites.some(
                                    (fav) => fav.title === character.title
                                )}
                                onFlip={() => handleFlip(index)}
                                onLike={() => handleLike(character)}
                                showFavorites={showFavorites}
                                isChecked={!!checkedStates[character.title]}
                                onCheck={() => handleCheckToggle(character.title)}
                            />
                        )
                    )}
                </div>
            </main>
        </div>
    );
}

export default App;
