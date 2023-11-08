import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Login = () => {
  const initialState = { email: "", password: "", name: "", last_name: "" };
  const navigate = useNavigate();
  const [invalidEmail, setInvalidEmail] = useState(null);
  // eslint-disable-next-line
  const [user, setUser] = useState({});
  const [inputData, setInputData] = useState(initialState);

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
      .then((response) => {
        setUser(response.data);
        navigate("/users/login");
      })
      .catch(() =>
        setInvalidEmail(
          "Email associated with an existing account. Sadly we do not offer password recuperation, so better remember it!"
        )
      );
    setInputData(initialState);
  };
  document.body.classList.add("loginPage");
  return (
    <div className="login-box">
      <h1>Hey, Welcome!</h1>
      <h3>Give us your data and we"ll show you movies!</h3>
      <form>
        <div className="user-box">
          <input type="text" name="email" required="" onChange={inputValue} />
          <label>Email</label>
        </div>
        <div className="user-box">
          <input type="text" name="name" required="" onChange={inputValue} />
          <label>Name</label>
        </div>
        <div className="user-box">
          <input
            type="text"
            name="last_name"
            required=""
            onChange={inputValue}
          />
          <label>Last name</label>
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
        <div className="user-box">{invalidEmail && <p>{invalidEmail}</p>} </div>
        <center onClick={handleSubmit}>
          {/* ASK HERE! */}
          <a href="/users/register">
            SIGN UP
            <span></span>
          </a>
        </center>
      </form>
      <h4>Already have an account?</h4>
      {/* ASK HERE! */}
      <a className="tag-a-register-login" href="/users/login">
        Sign In here!
      </a>
    </div>
  );
};

export default Login;
