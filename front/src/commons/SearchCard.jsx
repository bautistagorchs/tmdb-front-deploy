import React from "react";
import { Link } from "react-router-dom";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

const SearchCard = ({ search }) => {
  const truncate = (overview) => {
    return overview.slice(0, 110) + "...";
  };
  return (
    <div className="parent">
      {search.length &&
        search.map((content, i) => (
          <Link to={`/movies/single/${content.id}`}>
            <div className="search-card-container" key={i}>
              <div className="img-container">
                {content.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${content.poster_path}`}
                    alt="Movie portrait"
                    className="img-front"
                  />
                ) : (
                  <img
                    src="https://i.ibb.co/FBZ0fKd/no-Picture-Available.jpg"
                    alt="Movie portrait"
                    className="img-front"
                  />
                )}
                <div className="img-back-search">
                  <p>
                    {content.overview
                      ? truncate(content.overview)
                      : "No description available, I guess you will have to watch it!"}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default SearchCard;
