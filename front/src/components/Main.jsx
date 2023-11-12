import React, { useEffect } from "react";
import Grid from "./Grid";
import { useLocation } from "react-router";
import Navbar from "../commons/Navbar";
import { motion } from "framer-motion/dist/framer-motion";

const Main = () => {
  const location = useLocation();
  //styles
  useEffect(() => {
    document.body.classList.toggle("main", location.pathname === "/main");
    return () => {
      document.body.classList.remove("main");
    };
  }, [location.pathname]);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{
        duration: 0.8,
        // delay: 0.5,
        // ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <Navbar />
      <Grid />
    </motion.div>
  );
};

export default Main;
