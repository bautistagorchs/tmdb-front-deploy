import axios from "axios";
import { AnimatePresence } from "framer-motion/dist/framer-motion";
import React, { useEffect } from "react";
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
import BackgoundElements from "./commons/BackgoundElements";

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
  }, [location, location.pathname]);
  return (
    <AnimatePresence mode="wait">
      {user.email && <Navbar />}
      <Routes location={location} key={location.pathname}>
        {!user.email && (
          <>
            <Route path="/" element={<Index />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/elements" element={<BackgoundElements />} />
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
      </Routes>
      <Footer />
    </AnimatePresence>
  );
};

export default App;
