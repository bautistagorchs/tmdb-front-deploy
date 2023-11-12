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
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZTBiM2EwNDZhYTBmMDc2OWJmZjVkYjAzZjQxOGY5MCIsInN1YiI6IjY1M2ZiOWNmMTA5Y2QwMDEwYjA0ZDBmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wzku16fHNckt9N_jxJD8CVMYvcJwQqvohN8BD26tfxA",
    },
  };
  const allRequestsToAPI = [
    {
      url: "https://api.themoviedb.org/3/trending/movie/day",
      setInfo: setTrendingMovies,
    },
    {
      url: "https://api.themoviedb.org/3/trending/tv/day",
      setInfo: setTrendingTvShows,
    },
    {
      url: "https://api.themoviedb.org/3/tv/airing_today",
      setInfo: setAiringToday,
    },
    {
      url: "https://api.themoviedb.org/3/discover/movie?with_genres=action",
      setInfo: setActionMovies,
    },
    {
      url: "https://api.themoviedb.org/3/discover/movie?with_genres=35",
      setInfo: setAnimationMovies,
    },
  ];
  const requestToAPI = (url, options, setData) => {
    axios
      .get(url, options)
      .then((response) => setData(response.data.results))
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    allRequestsToAPI.map((element) =>
      requestToAPI(element.url, options, element.setInfo)
    );
  });

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
