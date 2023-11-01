import React from "react";
//import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  console.log(user);
  return (
    <div className="navbar">
      <a href="/">Home</a>
      <a href="/">Movies</a>
      <a href="/">Tv Shows</a>
      {user.id ? (
        <p>Welcome, ${user.username}</p>
      ) : (
        <a href="/users/login">Log in</a>
      )}
    </div>
  );
};

export default Navbar;
