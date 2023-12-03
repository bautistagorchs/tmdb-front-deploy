import axios from "axios";
import { AnimatePresence } from "framer-motion/dist/framer-motion";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, useLocation, useNavigate } from "react-router";
import { Route } from "react-router-dom";
import Footer from "./commons/Footer";
import Navbar from "./commons/Navbar";
import Index from "./components/Index";
import Login from "./components/Login";
import Main from "./components/Main";
import Account from "./components/MyAccount";
import Register from "./components/Register";
import Search from "./components/Search";
import SingleActor from "./components/SingleActor";
import SingleMovie from "./components/SingleMovie";
import { setUser } from "./store/user";
import "./styles/index.scss";

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/users/me", {
        withCredentials: true,
      })
      .then((user) => dispatch(setUser(user.data)))
      .catch((error) => console.error(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // useEffect(() => {
  //   if (!user.email) {
  //     if (location.pathname === "/") return;
  //     if (location.pathname !== ("/login" || "/register")) {
  //       return navigate("/login");
  //     }
  //   } else if (user.email) {
  //     // if (location.pathname === "/") return navigate("/main");
  //     if (location.pathname.includes("/login" || "/register")) {
  //       return navigate("/main");
  //     }
  //   }
  // }, [user, location.pathname]);
  return (
    <AnimatePresence mode="wait">
      <Navbar />
      <Routes location={location} key={location.pathname}>
        {!user.email && (
          <>
            <Route path="/" element={<Index />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </>
        )}
        {user.email && (
          <>
            <Route path="/main" element={<Main />} />
            <Route path="/:media_type/single/:id" element={<SingleMovie />} />
            <Route path="/actor/single/:id" element={<SingleActor />} />
            <Route path="/search" element={<Search />} />
            <Route path="/account" element={<Account />} />
          </>
        )}
        {/* <Route path="/*" element={<Navigate to="/" />} /> */}
      </Routes>
      <Footer />
    </AnimatePresence>
  );
};

export default App;
