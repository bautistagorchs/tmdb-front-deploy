import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <a href="/">Home</a>
      <a href="/">Movies</a>
      <a href="/">Tv Shows</a>
      <Link to="/login">
        <button>Log in</button>
      </Link>
    </div>
  );
};

export default Navbar;
