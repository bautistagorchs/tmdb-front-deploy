import React from "react";
import Navbar from "./components/Navbar";
import "./index.scss";
import { Route, Routes } from "react-router";
import LogIn from "./components/LogIn";

const App = () => {
  const API = fetch(
    "https://api.themoviedb.org/3/movie/648?api_key=3e0b3a046aa0f0769bff5db03f418f90"
  )
    .then((res) => res.json())
    .then((data) => console.log(data.title));

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </div>
  );
};

export default App;
