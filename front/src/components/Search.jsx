import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Header from "../commons/Header";
import Swiper from "../commons/Swiper";
import Navbar from "./Navbar";
import SearchCard from "../commons/SearchCard";
import { useSelector } from "react-redux";

const Search = () => {
  // const searchInput = "zootopia";
  const search = useSelector((state) => state.search);

  //styles
  const location = useLocation();
  useEffect(() => {
    document.body.classList.toggle("main", location.pathname === "/search");
    return () => {
      document.body.classList.remove("main");
    };
  }, [location.pathname]);
  const [searchMovie, setSearchMovie] = useState([]);
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
          search.result || ""
        }`,
        options
      )
      .then((response) => {
        setSearchMovie(response.data.results);
      })
      .catch((err) => console.error(err));
  }, [search.result]);
  return (
    <div>
      <Navbar />
      <Header title={`Results for: ${search.result || "..."}`} />
      <SearchCard search={searchMovie} />
    </div>
  );
};

export default Search;
