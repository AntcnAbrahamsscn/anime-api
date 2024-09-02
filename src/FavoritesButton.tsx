// import React from "react";

// interface FavoritesButtonProps {

//     isLiked: boolean;
//     onLike: () => void;
// }

// export default function FavoritesButton({
//     isLiked,
//     onLike,
// }: FavoritesButtonProps) {
//     return (
//         <div
//             className={`like-button-container ${isLiked ? "liked" : ""}`}
//             onClick={(e) => {
//                 e.stopPropagation();
//                 onLike();
//             }}
//         >
//             <div className="heart-bg">
//                 <div className={`heart-icon ${isLiked ? "liked" : ""}`}></div>
//             </div>
//         </div>
//     );
// }
