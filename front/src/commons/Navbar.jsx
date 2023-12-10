import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setSearch } from "../store/search";
import { initialState, setUser } from "../store/user";
import axios from "axios";

const Navbar = () => {
  const { pathname } = useLocation();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (user.email) {
      document.querySelector(".navbar").style.display = "flex";
    }
  }, [user]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSearchClick = () => {
    navigate("/search");
  };
  const handleKeyPress = (e) => {
    dispatch(
      setSearch({ movieResult: e.target.value, tvResult: e.target.value })
    );
  };
  const handleLogoutClick = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:3001/api/users/logout",
        { user: user.email },
        { withCredentials: true }
      )
      .then(() => {
        dispatch(setUser(initialState));
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const setSearchValueNull = () => {
    dispatch(setSearch({ movieResult: null, tvResult: null }));
  };
  return (
    <div className="navbar">
      <div className="navbar-home-div">
        <Link to="/main">
          <button className="home-button" onClick={setSearchValueNull}>
            Home
          </button>
        </Link>
        <Link to="/main">
          <button className="home-button" onClick={setSearchValueNull}>
            Movies
          </button>
        </Link>
        <Link to="/main">
          <button className="home-button" onClick={setSearchValueNull}>
            Tv Shows
          </button>
        </Link>
      </div>
      <div className="navbar-logout-div">
        <div className="textInputWrapper">
          <input
            placeholder="Find a movie..."
            name="searchresult"
            id=""
            onClick={handleSearchClick}
            onChange={handleKeyPress}
            type="input"
            className="textInput"
          />
        </div>
        {pathname === `/account` ? (
          <button className="home-button" onClick={handleLogoutClick}>
            Log out
          </button>
        ) : (
          <Link to="/account">
            <button className="home-button">My Account </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
