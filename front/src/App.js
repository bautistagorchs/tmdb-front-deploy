import React from "react";
import { Routes } from "react-router";
import { Route } from "react-router-dom";
import "./index.scss";
import Login from "./components/Login";
import Main from "./components/Main";

const App = () => {
  // const API = fetch(
  //   "https://api.themoviedb.org/3/movie/648?api_key=3e0b3a046aa0f0769bff5db03f418f90"
  // )
  //   .then((res) => res.json())
  //   .then((data) => console.log(data.title));

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/users/register" element={<Login />} />
      <Route path="/users/login" element={<Login />} />
    </Routes>
  );
};

export default App;
