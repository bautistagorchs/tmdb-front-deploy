import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Grid from "./Grid";
import { useLocation } from "react-router";

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
    <div>
      <Navbar />
      <Grid />
    </div>
  );
};

export default Main;
