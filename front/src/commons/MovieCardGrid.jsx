import React from "react";

const MovieCardGrid = ({ moviesByActor }) => {
  const truncate = (overview) => {
    return overview.slice(0, 120) + "...";
  };

  console.log("######", moviesByActor?.cast);
  return (
    <div className="movie-card-container">
      {moviesByActor?.cast.map((element, i) => (
        <div className="movie-card" key={i}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${element.poster_path}`}
            alt=""
            className="img-front"
            style={{
              height: "25vh",
              margin: "0.5vh",
            }}
          />
          <div className="overview-back">
            <p className="overview-text">{truncate(element?.overview)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieCardGrid;
