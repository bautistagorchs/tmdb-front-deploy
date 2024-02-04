import axios from "axios";
import { motion } from "framer-motion/dist/framer-motion";
import React, { useState } from "react";
import { PiEyeLight, PiEyeSlashLight } from "react-icons/pi";
import { useNavigate } from "react-router";
import { Toaster, toast } from "../../node_modules/sonner/dist";

const Login = () => {
  const initialState = { email: "", password: "", name: "", last_name: "" };
  const navigate = useNavigate();
  const [invalidEmail, setInvalidEmail] = useState(null);
  const [user, setUser] = useState({}); // eslint-disable-line
  const [inputData, setInputData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [inputConfirmPassword, setInputConfirmPassword] = useState("");

  const inputValue = (e) => {
    const { name, value } = e.target;
    setInputData((previousState) => {
      return { ...previousState, [name]: value };
    });
  };
  const isValidEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      (inputData.email ||
        inputData.last_name ||
        inputData.name ||
        inputData.password ||
        inputData.confirmPassword) === undefined
    )
      return toast.error("Por favor complete todos los campos");
    else if (!isValidEmail(inputData.email))
      toast.error("Ingrese un correo electronico valido");
    else if (inputData.password !== inputConfirmPassword)
      toast.error("Las contraseñas no coinciden");
    else {
      axios
        .post("http://localhost:3001/api/users/register", inputData)
        .then((response) => {
          setUser(response.data);
          navigate("/login");
        })
        .catch(() =>
          setInvalidEmail(
            "Email associated with an existing account. Sadly we do not offer password recuperation, so better remember it!"
          )
        );
    }
    setInputData(initialState);
    setInputConfirmPassword("");
  };
  document.body.classList.add("loginPage");
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
      <div className="register-content-container">
        <h1>Hey, Welcome!</h1>
        <h3>Give us your data and we"ll show you movies!</h3>
        <form
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit(e);
            }
          }}
        >
          <div className="user-box">
            <input type="text" name="name" required="" onChange={inputValue} />
            <label className="placeholder-form-login">Name</label>
          </div>
          <div className="user-box">
            <input
              type="text"
              name="last_name"
              required=""
              onChange={inputValue}
            />
            <label className="placeholder-form-login">Last name</label>
          </div>
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
                style={
                  showPassword ? { display: "block" } : { display: "none" }
                }
              />
              <PiEyeLight
                fill="white"
                onClick={() => setShowPassword(!showPassword)}
                style={
                  showPassword ? { display: "none" } : { display: "block" }
                }
              />
            </div>
          </div>
          <div className="user-box">
            <input
              type={showConfirmPassword ? `text` : `password`}
              name="confirmPassword"
              required=""
              onChange={(e) => setInputConfirmPassword(e.target.value)}
            />
            <label className="placeholder-form-login">Confirm password</label>
            <div className="eye-icon">
              <PiEyeSlashLight
                fill="white"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={
                  showConfirmPassword
                    ? { display: "block" }
                    : { display: "none" }
                }
              />
              <PiEyeLight
                fill="white"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={
                  showConfirmPassword
                    ? { display: "none" }
                    : { display: "block" }
                }
              />
            </div>
          </div>
          <div className="user-box">
            {invalidEmail && <p>{invalidEmail}</p>}{" "}
          </div>
          <center onClick={handleSubmit}>
            SIGN UP
            <span></span>
          </center>
        </form>
        <h4>Already have an account?</h4>
        <a className="tag-a-register-login" href="/login">
          Sign In here!
        </a>
      </div>
      <Toaster richColors position="top-left" expand={false} />
    </motion.div>
  );
};

export default Login;
