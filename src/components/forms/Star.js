import React from "react";
import StarRating from "react-star-ratings";

const Star = ({ starClick, rating, numberOfStars }) => (
  <>
    <StarRating
      numberOfStars={numberOfStars}
      changeRating={() => starClick(rating)}
      starRatedColor="#0e295c"
      starHoverColor="#114ebe"
      starDimension="20px"
      isSelectable={true}
    />
    <br />
  </>
);
export default Star;
