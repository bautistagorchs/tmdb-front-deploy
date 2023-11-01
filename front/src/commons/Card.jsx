import React from "react";

const Card = ({ card }) => {
  //console.log("oh, it entered but its not showing anyhitng?");
  return (
    <div className="card">
      <div className="cardImage">
        <img src={card.poster_path} alt="not ready yet" />
      </div>
      <div className="cardTitle">{card.original_title}</div>
    </div>
  );
};

export default Card;
