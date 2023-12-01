import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { setUser } from "../store/user";
import { motion } from "framer-motion/dist/framer-motion";

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
    if ((inputData.password || inputData.email) === "") {
      return setError("you have to enter your email and password");
    }
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
  const labelUp = () => {
    return document.querySelectorAll("label").classList.add("label-up");
  };
  return (
    <motion.div
      className="login-box"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="title-and-info-container">
        <h1 className="h1-title-login">TMDB</h1>
        <h3 className="h3-subtitle-login">A project made by Bautista Gorchs</h3>
        <h4 className="h4-subtitle-login">- Full-Stack developer -</h4>
      </div>
      <h1>Hey, Welcome back!</h1>
      <form className="form-container">
        <div className="user-box">
          <input type="text" name="email" required="" onChange={inputValue} />
          <label className="placeholder-form-login" onKeyDown={labelUp}>
            Email
          </label>
        </div>
        <div className="user-box">
          <input
            type="password"
            name="password"
            required=""
            onChange={inputValue}
          />
          <label className="placeholder-form-login">Password</label>
        </div>
        <div className="user-box">{error && <p>{error}</p>} </div>
        <center onClick={handleSubmit}>
          {/* ASK HERE! */}
          <a href="/">
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
    </motion.div>
  );
};

export default Login;
