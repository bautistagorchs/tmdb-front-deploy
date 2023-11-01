import React, { useState } from "react";
//import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const inputValue = (e) => {
    const { name, value } = e.target;
    setInputData((previousState) => {
      return { ...previousState, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/users/register", inputData)
      .catch((error) => console.error(error));
    setInputData({ email: "", password: "", username: "" });
  };
  document.body.classList.add("loginPage");
  return (
    <div className="login-box">
      <h3>Give us your data and we"ll show you movies!</h3>
      <form>
        <div className="user-box">
          <input type="text" name="email" required="" onChange={inputValue} />
          <label>Email</label>
        </div>
        <div className="user-box">
          <input
            type="text"
            name="username"
            required=""
            onChange={inputValue}
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
        <center onClick={handleSubmit}>
          <a href="/users/register">
            SIGN UP
            <span></span>
          </a>
        </center>
      </form>
    </div>
  );
};

export default Login;
