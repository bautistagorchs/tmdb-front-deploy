import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
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
    email: "",
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
      .post("http://localhost:3001/api/users/login", inputData, {
        withCredentials: true,
      })
      .then(() => navigate("/main"))
      .catch((error) => {
        setError("email or passsword incorrect");
        console.error(error);
      });
    const { email } = inputData;
    dispatch(setUser(email));
    setInputData({ password: "", email: "" });
  };

  return (
    <div className="login-box">
      <h1>Hey, Welcome back!</h1>
      <form>
        <div className="user-box">
          <input
            type="text"
            name="email"
            required=""
            onChange={inputValue}
            // placeholder="email"
          />
          <label>Email</label>
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
        <div className="user-box">{error && <p>{error}</p>} </div>
        <center onClick={handleSubmit}>
          {/* ASK HERE! */}
          <a href="/users/login">
            SIGN IN
            <span></span>
          </a>
        </center>
      </form>
      <h4>Dont have an account yet?</h4>
      {/* ASK HERE! */}
      <a className="tag-a-register-login" href="/users/register">
        Sign Up here!
      </a>
    </div>
  );
};

export default Login;
