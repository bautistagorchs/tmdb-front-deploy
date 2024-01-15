import React from "react";
import { MdArrowOutward } from "react-icons/md";
import { Link } from "react-router-dom";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

const SearchCard = ({ search }) => {
  console.log(`🚀 - search:`, search);
  const truncate = (overview) => {
    return overview.slice(0, 110) + "...";
  };
  return (
    <div id="search-page" className="parent">
      {search.length
        ? search.map((content, i) => {
            {
              if (!content.poster_path && !content.profile_path) return;
            }
            return (
              <Link to={`/movies/single/${content.id}`} key={i}>
                <div className="search-card-container">
                  <div className="img-container">
                    <img
                      src={
                        (content.poster_path || content.profile_path) &&
                        `https://image.tmdb.org/t/p/w500/${
                          content.poster_path || content.profile_path
                        }`
                      }
                      alt="No portrait available"
                      className="img-front"
                    />
                    <div className="img-back-search">
                      {content.media_type === "person" ? (
                        <Link to={`/actor/single/${content?.id}`}>
                          <p id="details" className="cursor-pointer">
                            Details
                            <MdArrowOutward />
                          </p>
                        </Link>
                      ) : (
                        <p>
                          {content.overview
                            ? truncate(content.overview)
                            : "No description available, I guess you will have to watch it!"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        : ""}
    </div>
  );
};

export default SearchCard;
