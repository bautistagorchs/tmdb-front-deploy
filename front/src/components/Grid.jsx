import axios from "axios";
import React, { useEffect, useState } from "react";
import Swiper from "../commons/Swiper";
import Header from "../commons/Header";

const Grid = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTvShows, setTrendingTvShows] = useState([]);
  const [airingToday, setAiringToday] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [animationMovies, setAnimationMovies] = useState([]);
  const options = {
    // params: {
    //   page: 4,
    // },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZTBiM2EwNDZhYTBmMDc2OWJmZjVkYjAzZjQxOGY5MCIsInN1YiI6IjY1M2ZiOWNmMTA5Y2QwMDEwYjA0ZDBmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wzku16fHNckt9N_jxJD8CVMYvcJwQqvohN8BD26tfxA",
    },
  };
  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/trending/movie/day", options)
      .then((response) => {
        setTrendingMovies(response.data.results);
      })
      .catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/trending/tv/day", options)
      .then((response) => {
        setTrendingTvShows(response.data.results);
      })
      .catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/tv/airing_today", options)
      .then((response) => {
        setAiringToday(response.data.results);
      })
      .catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/discover/movie?with_genres=action",
        options
      )
      .then((response) => {
        setActionMovies(response.data.results);
      })
      .catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/discover/movie?with_genres=35",
        options
      )
      .then((response) => {
        setAnimationMovies(response.data.results);
      })
      .catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header title={"Trending Movies"} />
      <Swiper content={trendingMovies} />
      <Header title={"Most watched Tv Shows"} />
      <Swiper content={trendingTvShows} />
      <Header title={"Tv Shows Airing Today"} />
      <Swiper content={airingToday} />
      <Header title={"Action Movies"} />
      <Swiper content={actionMovies} />
      <Header title={"Comedy Movies"} />
      <Swiper content={animationMovies} />
    </div>
  );
};

export default Grid;
