import React, { useEffect } from "react";
import { Navigate, Routes, useLocation } from "react-router";
import { Route } from "react-router-dom";
import "./styles/index.scss";
import Main from "./components/Main";
import Register from "./components/Register";
import Login from "./components/Login";
import Index from "./components/Index";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./store/user";
import Search from "./components/Search";
import SingleMovie from "./components/SingleMovie";
import { AnimatePresence } from "framer-motion/dist/framer-motion";
import SingleActor from "./components/SingleActor";
import Navbar from "./commons/Navbar";

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/users/me", {
        withCredentials: true,
      })
      .then((user) => dispatch(setUser(user.data)))
      .catch((error) => console.error(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AnimatePresence mode="wait">
      {user.email && <Navbar />}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/index" element={<Index />} />
        <Route path="/main" element={<Main />} />
        <Route path="/:media_type/single/:id" element={<SingleMovie />} />
        <Route path="/actor/single/:id" element={<SingleActor />} />
        <Route path="/users/register" element={<Register />} />
        <Route path="/users/login" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
