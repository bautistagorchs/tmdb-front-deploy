import React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

const MovieCardGrid = ({ movies }) => {
  const location = useLocation();
  const truncate = (overview) => {
    return overview.slice(0, 120) + "...";
  };
  return (
    <div
      className="movie-card-container"
      id={
        location.pathname === "/account"
          ? `marginAccount`
          : location.pathname.includes("/actor/single") &&
            `scroll-bar-single-actor`
      }
    >
      {movies?.map((element, i) => (
        <Link to={`/movies/single/${element.id}`}>
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
        </Link>
      ))}
    </div>
  );
};

export default MovieCardGrid;
