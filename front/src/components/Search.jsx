import axios from "axios";
import { motion } from "framer-motion/dist/framer-motion";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Header from "../commons/Header";
import SearchCard from "../commons/SearchCard";

const Search = () => {
  const [inputData, setInputData] = useState({});
  const [searchResult, setSearchResult] = useState([]);
  //styles
  const location = useLocation();
  useEffect(() => {
    document.body.classList.toggle("main", location.pathname === "/search");
    return () => {
      document.body.classList.remove("main");
    };
  }, []); // eslint-disable-line
  useEffect(() => {
    window.scrollTo(0, -1000);
  }, []);
  const inputValue = (e) => {
    const { value } = e.target;
    setInputData((previousState) => ({ ...previousState, value }));
  };
  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/search/multi",
      params: {
        query: inputData.value,
      },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZTBiM2EwNDZhYTBmMDc2OWJmZjVkYjAzZjQxOGY5MCIsInN1YiI6IjY1M2ZiOWNmMTA5Y2QwMDEwYjA0ZDBmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wzku16fHNckt9N_jxJD8CVMYvcJwQqvohN8BD26tfxA",
      },
    };
    axios
      .request(options)
      .then(function (response) {
        setSearchResult(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [inputData.value]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.8,
      }}
    >
      <div className="search-container">
        <input
          type="search"
          name="search"
          placeholder="Type something..."
          className="input-search"
          onChange={inputValue}
          autoFocus
        />
        <Header title={`Results found for: ${inputData.value || "..."}`} />
        <SearchCard search={searchResult} />
      </div>
    </motion.div>
  );
};

export default Search;
