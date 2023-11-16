import React, { useState } from "react";

const StarRating = ({ skillName, setSkillRating }) => {
  const [rating, setRating] = useState(0);

  const handleClick = (value) => {
    setRating(value);
    setSkillRating(value); // Update parent state with skill name and rating
  };

  return (
    <div>
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          className={`fa fa-star${index < rating ? ' text-yellow-500' : ' text-gray-300'}`}
          onClick={() => handleClick(index + 1)}
          style={{ cursor: 'pointer' }}
        ></span>
      ))}
    </div>
  );
};

export default StarRating;
