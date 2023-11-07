import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setSearch } from "../store/search";
import axios from "axios";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const handleSearchClick = () => {
    navigate("/search");
  };
  const handleKeyPress = (e) => {
    if (e.key == "Enter") {
      dispatch(setSearch({ result: e.target.value }));
    }
  };
  const handleLogoutClick = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:3001/api/users/logout",
        { user: user.email },
        {
          withCredentials: true,
        }
      )
      .then(() => navigate("/"))
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="navbar">
      <div className="navbar-home-div">
        <Link to="/main">
          <button className="home-button">Home</button>
        </Link>
      </div>

      {/* <div> */}

      <div class="textInputWrapper">
        <input
          placeholder="Search results..."
          name="searchresult"
          id=""
          onClick={handleSearchClick}
          onKeyDown={handleKeyPress}
          type="input"
          className="textInput"
        />
      </div>
      {user.name ? (
        <div className="navbar-logout-div">
          <p>Hey {user.name}!</p>
          <Link to="/users/logout">
            <button className="home-button" onClick={handleLogoutClick}>
              Log out{" "}
            </button>
          </Link>
        </div>
      ) : (
        <Link to="/users/login">
          <button className="home-button">Log In</button>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
