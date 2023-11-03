import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch /*useSelector*/ } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { setUser } from "../store/user";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  //styles
  useEffect(() => {
    document.body.classList.toggle(
      "loginPage",
      location.pathname === "/users/login"
    );
    return () => {
      document.body.classList.remove("loginPage");
    };
  }, [location.pathname]);

  // all the logic of inputs
  const [inputData, setInputData] = useState({
    password: "",
    username: "",
  });
  const [error, setError] = useState(null);
  const inputValue = (e) => {
    const { name, value } = e.target;
    setInputData((previousState) => {
      return { ...previousState, [name]: value };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/users/login", inputData)
      .then(() => navigate(`/`))
      .catch((error) => {
        setError("username or passsword incorrect");
        console.error(error);
      });
    const { username, password } = inputData;
    dispatch(setUser(username, password));
    setInputData({ password: "", username: "" });
  };

  return (
    <div className="login-box">
      <h1>Hey, Welcome back!</h1>
      <form>
        <div className="user-box">
          <input
            type="text"
            name="username"
            required=""
            onChange={inputValue}
            // placeholder="username"
          />
          <label>Username</label>
        </div>
        <div className="user-box">
          <input
            type="password"
            name="password"
            required=""
            onChange={inputValue}
          />
          <label>Password</label>
        </div>
        <div className="user-box">{error && <p>{error}</p>}</div>
        <center onClick={handleSubmit}>
          <a href="/users/register">
            SIGN IN
            <span></span>
          </a>
        </center>
      </form>
      <h4>Dont have an account yet?</h4>
      <a href="/users/register">Sign Up here!</a>
    </div>
  );
};

export default Login;
