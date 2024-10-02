import React, { useState } from "react";

type StarRatingProps = {
  rating: number;
  totalStars?: number;
  onRatingChange?: (rating: number) => void;
};

function StarRating({
  rating,
  totalStars = 5,
  onRatingChange,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const handleRating = (newRating: number) => {
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  const handleHover = (newRating: number) => {
    setHoverRating(newRating);
  };

  const visibleRating = hoverRating > 0 ? hoverRating : rating;

  return (
    <div className="flex">
      {Array.from({ length: totalStars }, (_, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={`w-8 h-8 cursor-pointer ${index + 1 > visibleRating ? "fill-gray-400" : "fill-yellow-500"}`}
          onClick={() => handleRating(index + 1)}
          onMouseEnter={() => handleHover(index + 1)}
          onMouseLeave={() => handleHover(0)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>
      ))}
    </div>
  );
}

export { StarRating };
