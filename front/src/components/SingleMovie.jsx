import React, { useEffect } from "react";
import SingleMovieCard from "../commons/SingleMovieCard";
import Navbar from "../commons/Navbar";
import { useLocation, useParams } from "react-router";
import { motion } from "framer-motion/dist/framer-motion";

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
  console.log("parametros", params);
  return (
    <motion.div
      className="div-container-single-movie-page"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
    >
      <Navbar />
      <SingleMovieCard />
    </motion.div>
  );
};

export default SingleMovie;
