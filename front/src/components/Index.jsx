import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { motion } from "framer-motion/dist/framer-motion";

const Index = () => {
  const location = useLocation();
  //styles
  useEffect(() => {
    document.body.classList.toggle("indexPage", location.pathname === "/");
    return () => {
      document.body.classList.remove("indexPage");
    };
  }, [location.pathname]);
  return (
    <motion.div
      className="index"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
    >
      <div className="index-content">
        <h1>Hey there!</h1>
        <h2> We are happy to have here!</h2>
        <h4>Ready to enjoy the best movies in the best site?</h4>
      </div>
      <div className="buttons">
        <Link to="/users/register">
          <button className="btn">
            <span></span>
            <p
              data-start="good luck!"
              data-text="Sing Up!"
              data-title="First time?"
            ></p>
          </button>
        </Link>
        <Link to="/users/login">
          <button className="btn">
            <span></span>
            <p
              data-start="good luck!"
              data-text="Sign In!"
              data-title="Have an account?"
            ></p>
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default Index;
