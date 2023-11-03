import React from "react";
//import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  return (
    <div className="navbar">
      <Link to="/main">Home</Link>
      <Link to="/movies">Movies</Link>
      <Link to="/">Tv Shows</Link>
      {user.id ? (
        <p>Welcome, ${user.username}</p>
      ) : (
        <a href="/users/login">Log in</a>
      )}
    </div>
  );
};

export default Navbar;
