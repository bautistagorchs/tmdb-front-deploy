import { motion } from "framer-motion/dist/framer-motion";
import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router";
import SingleMovieCard from "../commons/SingleMovieCard";

const SingleMovie = () => {
  window.scrollTo(0, 0);
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
    <motion.div
      className="div-container-single-movie-page"
      initial={{ x: -400 }}
      animate={{ x: 0 }}
      exit={{ x: 800 }}
      transition={{ duration: 0.7 }}
      exitTransition={{ duration: 0.1 }}
    >
      <SingleMovieCard />
    </motion.div>
  );
};

export default SingleMovie;
