import { ApiData } from "./data/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCheck } from "@fortawesome/free-solid-svg-icons"; 
import React from "react";

interface CardProps {
    character: ApiData;
    isFlipped: boolean;
    isLiked: boolean;
    onFlip: () => void;
    onLike: () => void;
    showFavorites: boolean;
    isChecked: boolean;
    onCheck: () => void;
}

export default function Card({
    character,
    isFlipped,
    isLiked,
    onFlip,
    onLike,
    showFavorites,
    isChecked,
    onCheck,
}: CardProps) {
    return (
        <section
            className={`character-card ${isFlipped ? "flipped" : ""}`}
            onClick={onFlip}
        >
            <div className="flip-card">
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <img
                            src={character.image}
                            alt={character.title}
                            className="character-image"
                        />
                        {isLiked && !showFavorites && (
                            <div className="marked-favorite">
                                <div></div>
                            </div>
                        )}
                    </div>
                    <div className="flip-card-back">
                        <h3>{character.title}</h3>
                        <p className="p-minor">{character.director}</p>
                        <div className="character-details">
                            <p>{character.description}</p>
                        </div>
                        <div className="character-stats">
                            <p>Release date:</p>
                            <p>{character.release_date}</p>
                        </div>
                        <div className="character-stats">
                            <p>Rating:</p>
                            <p>{character.rt_score}/100</p>
                        </div>
                        <div className="testing-buttons">
                            <div
                                className={`like-button-container ${
                                    isLiked ? "liked" : ""
                                }`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onLike();
                                }}
                            >
                                <div className="heart-bg">
                                    <div
                                        className={`heart-icon ${
                                            isLiked ? "liked" : ""
                                        }`}
                                    ></div>
                                </div>
                            </div>
                            {showFavorites && (
                                <div
                                    className="check-icon-container"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onCheck();
                                    }}
                                >
                                    <FontAwesomeIcon
                                        icon={
                                            isChecked ? faCheck : faCircleCheck
                                        } 
                                        className="check-icon"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
