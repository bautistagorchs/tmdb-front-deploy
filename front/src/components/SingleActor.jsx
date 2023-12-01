import { motion } from "framer-motion/dist/framer-motion";
import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router";
import SingleActorCard from "../commons/SingleActorCard";

const SingleMovie = () => {
  //styles
  const location = useLocation();
  const params = useParams();
  useEffect(() => {
    location.pathname === `/actor/single/${params.id}` &&
      document.body.classList.add("single-movie");
    return () => {
      document.body.classList.remove("single-movie");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <motion.div
      className="div-container-single-movie-page"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      // initial={{ opacity: 0, y: -50 }}
      // animate={{ opacity: 1, y: 0 }}
      // exit={{ opacity: 0, y: 50 }}
      // transition={{ duration: 0.6 }}
    >
      {/* <Navbar /> */}
      <SingleActorCard />
    </motion.div>
  );
};

export default SingleMovie;
