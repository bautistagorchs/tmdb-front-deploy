import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import { Link } from "react-router-dom";

const SwiperPeople = ({ content }) => {
  SwiperCore.use([Navigation]);
  return (
    <Swiper spaceBetween={10} slidesPerView={9} loop={true} navigation={true}>
      {content.length &&
        content.map((content, i) => (
          <SwiperSlide className="swiper-slide-people" key={i}>
            <Link to={`/actor/single/${content.id}`}>
              <div className="img-container-people">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${content.profile_path}`}
                  alt={content.name}
                  className="img-front-people"
                />
              </div>
            </Link>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default SwiperPeople;
