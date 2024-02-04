import axios from "axios";
import { motion } from "framer-motion/dist/framer-motion";
import React, { useEffect, useState } from "react";
import { PiEyeLight, PiEyeSlashLight } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { setUser } from "../store/user";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [inputData, setInputData] = useState({
    password: "",
    email: "",
  });
  //styles
  useEffect(() => {
    document.body.classList.toggle("loginPage", location.pathname === "/login");
    return () => {
      document.body.classList.remove("loginPage");
    };
  }, [location.pathname]);

  const inputValue = (e) => {
    const { name, value } = e.target;
    setInputData((previousState) => {
      return { ...previousState, [name]: value };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if ((inputData.password || inputData.email) === "") {
      return setError("you have to enter your email and password");
    }
    axios
      .post("http://localhost:3001/api/users/login", inputData, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.email) {
          dispatch(setUser(res.data));
          return navigate("/main");
        }
      })
      .catch((error) => {
        setError("email or passsword incorrect");
        console.error(error);
      });
    setInputData({ password: "", email: "" });
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
      <form
        className="form-container"
        action="submit"
        onSubmit={handleSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit(e);
          }
        }}
      >
        <div className="user-box">
          <input type="text" name="email" required="" onChange={inputValue} />
          <label className="placeholder-form-login">Email</label>
        </div>
        <div className="user-box">
          <input
            type={showPassword ? `text` : `password`}
            name="password"
            required=""
            onChange={inputValue}
          />
          <label className="placeholder-form-login">Password</label>
          <div className="eye-icon">
            <PiEyeSlashLight
              fill="white"
              onClick={() => setShowPassword(!showPassword)}
              style={showPassword ? { display: "block" } : { display: "none" }}
            />
            <PiEyeLight
              fill="white"
              onClick={() => setShowPassword(!showPassword)}
              style={showPassword ? { display: "none" } : { display: "block" }}
            />
          </div>
        </div>
        <div className="user-box">{error && <p>{error}</p>} </div>
        <center onClick={handleSubmit}>
          <a href="/">
            SIGN IN
            <span></span>
          </a>
        </center>
      </form>
      <h4>Dont have an account yet?</h4>
      <a className="tag-a-register-login" href="/register">
        Sign Up here!
      </a>
    </motion.div>
  );
};

export default Login;
