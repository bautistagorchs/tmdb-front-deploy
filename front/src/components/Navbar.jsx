import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setSearch } from "../store/search";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const handleClick = () => {
    navigate("/search");
  };
  const handleKeyPress = (e) => {
    if (e.key == "Enter") {
      dispatch(setSearch({ result: e.target.value }));
    }
  };
  return (
    <div className="navbar">
      <Link to="/main">
        <button className="home-button">Home</button>
      </Link>

      {/* <div> */}

      <div class="textInputWrapper">
        <input
          placeholder="Search results..."
          name="searchresult"
          id=""
          onClick={handleClick}
          onKeyDown={handleKeyPress}
          type="input"
          className="textInput"
        />
      </div>
      {/* <input
          type="input"
          name="searchresult"
          id=""
          onClick={handleClick}
          onKeyDown={handleKeyPress}
        />
      </div> */}
      {/* <button className="search-button">Search results</button> */}
      {/* ASK HERE! */}
      {user.name ? (
        <p>Hey {user.name}!</p>
      ) : (
        <Link to="/users/login">
          <button className="home-button">Log In</button>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
