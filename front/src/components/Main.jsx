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
    // initial={{ opacity: 0, x: 200 }}
    // animate={{ opacity: 1, x: 0 }}
    // exit={{ opacity: 0, x: -200 }}
    // transition={{ duration: 0.5, opacity: { duration: 1 } }}
    // exitTransition={{ duration: 0 }}
    >
      <Grid />
    </motion.div>
  );
};

export default Main;
