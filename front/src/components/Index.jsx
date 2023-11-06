import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

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
    <div className="index">
      <div className="index-content">
        <h1>Hey there!</h1>
        <h2> We are happy to have here!</h2>
        <h4>Ready to enjoy the best movies in the best site?</h4>
      </div>
      <div class="buttons">
        <Link to="/users/register">
          <button class="btn">
            <span></span>
            <p
              data-start="good luck!"
              data-text="Sing Up!"
              data-title="First time?"
            ></p>
          </button>
        </Link>
        <Link to="/users/login">
          <button class="btn">
            <span></span>
            <p
              data-start="good luck!"
              data-text="Sign In!"
              data-title="Have an account?"
            ></p>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
