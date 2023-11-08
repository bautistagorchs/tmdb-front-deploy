import React, { useEffect } from "react";
import Navbar from "../commons/Navbar";
import { useLocation } from "react-router";

const SingleMovie = () => {
  //styles
  const location = useLocation();
  useEffect(() => {
    document.body.classList.toggle(
      "single-movie",
      location.pathname === "/movies/single"
    );
    return () => {
      document.body.classList.remove("single-movie");
    };
  }, [location.pathname]);

  return (
    <div>
      <Navbar />
      <div className="single-movie-container">
        {/* <div className="movie-container"> */}
        <div className="img-container">
          <img
            src={`https://image.tmdb.org/t/p/w500/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg`}
            alt=""
          />
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default SingleMovie;
