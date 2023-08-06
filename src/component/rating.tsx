import React from 'react';

interface StarRatingProps {
  rating: number;
  editable?: boolean;
  onChange?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, editable = true, onChange }) => {
  const maxRating = 5;
  const filledStars = Math.round(Math.min(Math.max(rating, 0), maxRating));
  const handleClick = (value: number) => {
    if (editable && onChange) {
      onChange(value);
    }
  };

  const stars = Array.from({ length: maxRating }, (_, index) => (
    <span
      key={index}
      onClick={() => handleClick(index + 1)}
      className={`material-icons ${
        index < filledStars ? 'text-yellow-500' : 'text-gray-300'
      }`}
    >
      {index < filledStars ? 'star' : 'star_border'}
    </span>
  ));

  return <>{stars}</>;
};

export default StarRating;
