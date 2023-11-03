import React from "react";
import { Routes } from "react-router";
import { Route } from "react-router-dom";
import "./styles/index.scss";
import Main from "./components/Main";
import Movies from "./components/Movies";
import Register from "./components/Register";
import Login from "./components/Login";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/users/register" element={<Register />} />
      <Route path="/users/login" element={<Login />} />
    </Routes>
  );
};

export default App;
