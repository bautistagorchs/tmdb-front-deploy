import React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

const MovieCardGrid = ({ content }) => {
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
      {content?.map((element, i) =>
        element.title ? (
          <Link to={`/movies/single/${element.id}`}>
            <div className="movie-card" key={i}>
              <img
                src={
                  element.poster_path &&
                  `https://image.tmdb.org/t/p/w500/${element.poster_path}`
                }
                alt=""
                className="img-front"
                style={{
                  height: "26vh",
                  margin: "0.5vh",
                }}
              />
              <div className="overview-back">
                <p className="overview-movie-name">-{element?.title}-</p>
                <p className="overview-text">{truncate(element?.overview)}</p>
              </div>
            </div>
          </Link>
        ) : !element.birthday ? (
          <Link to={`/tvshow/single/${element.id}`}>
            <div className="movie-card" key={i}>
              <img
                src={
                  element.poster_path &&
                  `https://image.tmdb.org/t/p/w500/${element.poster_path}`
                }
                alt=""
                className="img-front"
                style={{
                  height: "26vh",
                  margin: "0.5vh",
                }}
              />
              <div className="overview-back">
                <p className="overview-movie-name">-{element?.name}-</p>
                <p className="overview-text">{truncate(element?.overview)}</p>
              </div>
            </div>
          </Link>
        ) : (
          <Link to={`/actor/single/${element.id}`}>
            <div className="movie-card" key={i}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${element.profile_path}`}
                alt=""
                className="img-front-actor"
                style={{
                  height: "29vh",
                  margin: "0.5vh",
                }}
              />
              <div className="overview-back" id="overview-back-actor">
                <p className="overview-text">-{element?.name}-</p>
              </div>
            </div>
          </Link>
        )
      )}
    </div>
  );
};

export default MovieCardGrid;
