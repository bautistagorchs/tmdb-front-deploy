import axios from "axios";
import { motion } from "framer-motion/dist/framer-motion";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import Header from "../commons/Header";
import SearchCard from "../commons/SearchCard";

const Search = () => {
  const search = useSelector((state) => state.search);
  //styles
  const location = useLocation();
  useEffect(() => {
    document.body.classList.toggle("main", location.pathname === "/search");
    return () => {
      document.body.classList.remove("main");
    };
  }, []);
  const [searchMovie, setSearchMovie] = useState([]);
  const [searchTvShow, setSearchTvShow] = useState([]);
  const options = {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZTBiM2EwNDZhYTBmMDc2OWJmZjVkYjAzZjQxOGY5MCIsInN1YiI6IjY1M2ZiOWNmMTA5Y2QwMDEwYjA0ZDBmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wzku16fHNckt9N_jxJD8CVMYvcJwQqvohN8BD26tfxA",
    },
  };
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?query=${
          search.movieResult || ""
        }`,
        options
      )
      .then((response) => {
        setSearchMovie(response.data.results);
      })
      .catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search.movieResult]);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/tv?query=${search.tvResult || ""}`,
        options
      )
      .then((response) => setSearchTvShow(response.data.results))
      .catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search.tvResult]);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        // delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      {/* <Navbar /> */}
      <Header title={`Movies found for: ${search.movieResult || "..."}`} />
      <SearchCard search={searchMovie} />
      {searchTvShow.length ? (
        <Header title={`Tv Shows found for: ${search.tvResult || "..."}`} />
      ) : (
        ""
      )}{" "}
      <SearchCard search={searchTvShow} />
    </motion.div>
  );
};

export default Search;
