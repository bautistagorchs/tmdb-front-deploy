import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import { Link } from "react-router-dom";

const Card = ({ content }) => {
  const truncate = (overview) => {
    return overview.slice(0, 110) + "...";
  };
  SwiperCore.use([Navigation]);

  return (
    <Swiper spaceBetween={10} slidesPerView={9} loop={true} navigation={true}>
      {content.length &&
        content.map((content, i) => (
          <SwiperSlide className="SwiperSlide" key={i}>
            <Link to={`/${content.media_type}/single/${content.id}`}>
              <div className="img-container">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${content.poster_path}`}
                  alt={content.title}
                  className="img-front"
                />
                <div className="img-back">
                  <p>
                    {content.overview
                      ? truncate(content.overview)
                      : "No description available, I guess you will have to watch it!"}
                  </p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default Card;
