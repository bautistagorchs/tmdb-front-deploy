import React from "react";
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
          <div className="search-card-container" key={i}>
            <div className="img-container">
              {content.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500/${content.poster_path}`}
                  alt=""
                  className="img-front"
                />
              ) : (
                <img
                  src="https://i.ibb.co/FBZ0fKd/no-Picture-Available.jpg"
                  alt="No Picture Available"
                  className="img-front"
                />
              )}

              <div className="img-back">
                {/* <p>
                  {content.overview
                    ? truncate(content.overview)
                    : "No description available, I guess you will have to watch it!"}
                </p> */}
              </div>
              <div className="search-img-back"></div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SearchCard;
{
  /* <p>
          {content.overview
            ? truncate(content.overview)
            : "No description available, I guess you will have to watch it!"}
          </p> */
}
{
  /* <p>{content.title || content.name}</p> */
}
