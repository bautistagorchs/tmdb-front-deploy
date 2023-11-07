import React, { useEffect } from "react";
import { Navigate, Routes } from "react-router";
import { Route } from "react-router-dom";
import "./styles/index.scss";
import Main from "./components/Main";
import Movies from "./components/Movies";
import Register from "./components/Register";
import Login from "./components/Login";
import Index from "./components/Index";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "./store/user";
import Search from "./components/Search";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/users/me", {
        withCredentials: true,
      })
      .then((user) => {
        dispatch(setUser(user.data));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/main" element={<Main />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/users/register" element={<Register />} />
      <Route path="/users/login" element={<Login />} />
      <Route path="/search" element={<Search />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
