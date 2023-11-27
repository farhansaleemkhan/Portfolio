import React, { useState, useEffect } from "react";

const Rating = ({ value }) => {
  const [ratingValue, setRatingValue] = useState(0);

  useEffect(() => {
    setRatingValue(value);
  }, [value]);

  const stars = [];

  // Filling the stars based on the rating value
  for (let i = 1; i <= 5; i++) {
    if (i <= ratingValue) {
      stars.push(<i key={i} className="fa fa-star text-yellow-500" />);
    } else {
      stars.push(<i key={i} className="fa fa-star text-gray-300" />);
    }
  }

  return <div>{stars}</div>;
};

export default Rating;
