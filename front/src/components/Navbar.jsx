import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  return (
    <div className="navbar">
      <div className="links-navbar">
        <Link to="/main">Home</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/">Tv Shows</Link>
      </div>
      {/* ASK HERE! */}
      {user.id ? (
        <p>Welcome, {user.name}</p>
      ) : (
        <a href="/users/login">Log in</a>
      )}
    </div>
  );
};

export default Navbar;
