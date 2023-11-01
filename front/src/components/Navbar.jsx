import React from "react";
//import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <a href="/">Home</a>
      <a href="/">Movies</a>
      <a href="/">Tv Shows</a>
      {/* <button onClick={requestToAPI}>Log in</button> */}
    </div>
  );
};

export default Navbar;
