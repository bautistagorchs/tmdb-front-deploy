import { motion } from "framer-motion/dist/framer-motion";
import React, { useEffect } from "react";
import { useLocation } from "react-router";
import Grid from "./Grid";

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
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: -800 }}
      transition={{ duration: 0.7, ease: "ease", delay: 0.5 }}
    >
      <Grid />
    </motion.div>
  );
};

export default Main;
