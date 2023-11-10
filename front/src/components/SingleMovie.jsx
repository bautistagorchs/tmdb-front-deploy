import React, { useEffect } from "react";
import SingleMovieCard from "../commons/SingleMovieCard";
import Navbar from "../commons/Navbar";
import { useLocation, useParams } from "react-router";

const SingleMovie = () => {
  //styles
  const location = useLocation();
  const params = useParams();
  useEffect(() => {
    location.pathname === `/${params.media_type}/single/${params.id}` &&
      document.body.classList.add("single-movie");
    return () => {
      document.body.classList.remove("single-movie");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <div className="div-container-single-movie-page">
      <Navbar />
      <SingleMovieCard />
    </div>
  );
};

export default SingleMovie;
