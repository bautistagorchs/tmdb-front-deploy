import axios from "axios";
import React, { useEffect, useState } from "react";
import Swiper from "../commons/Swiper";
import Header from "../commons/Header";
import SwiperPeople from "../commons/SwiperPeople";

const Grid = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTvShows, setTrendingTvShows] = useState([]);
  const [airingToday, setAiringToday] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [animationMovies, setAnimationMovies] = useState([]);
  const [popularPeople, setPopularPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const options = {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZTBiM2EwNDZhYTBmMDc2OWJmZjVkYjAzZjQxOGY5MCIsInN1YiI6IjY1M2ZiOWNmMTA5Y2QwMDEwYjA0ZDBmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wzku16fHNckt9N_jxJD8CVMYvcJwQqvohN8BD26tfxA",
    },
  };
  const requestToAPI = (url, options, setData) => {
    axios
      .get(url, options)
      .then((response) =>
        setData((prevResults) => [...prevResults, ...response.data.results])
      )
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    requestToAPI(
      "https://api.themoviedb.org/3/trending/movie/day?&page=1",
      options,
      setTrendingMovies
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    requestToAPI(
      "https://api.themoviedb.org/3/trending/movie/day?&page=2",
      options,
      setTrendingMovies
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    requestToAPI(
      "https://api.themoviedb.org/3/trending/tv/day?&page=1",
      options,
      setTrendingTvShows
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    requestToAPI(
      "https://api.themoviedb.org/3/trending/tv/day?&page=2",
      options,
      setTrendingTvShows
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    requestToAPI(
      `https://api.themoviedb.org/3/person/popular?language=en-US&page=1`,
      options,
      setPopularPeople
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    requestToAPI(
      `https://api.themoviedb.org/3/person/popular?language=en-US&page=2`,
      options,
      setPopularPeople
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    requestToAPI(
      "https://api.themoviedb.org/3/tv/airing_today?&page=1",
      options,
      setAiringToday
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    requestToAPI(
      "https://api.themoviedb.org/3/tv/airing_today?&page=2",
      options,
      setAiringToday
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    requestToAPI(
      "https://api.themoviedb.org/3/discover/movie?&with_genres=28&page=1",
      options,
      setActionMovies
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    requestToAPI(
      "https://api.themoviedb.org/3/discover/movie?&with_genres=28&page=2",
      options,
      setActionMovies
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    requestToAPI(
      "https://api.themoviedb.org/3/discover/movie?&with_genres=16&page=1",
      options,
      setAnimationMovies
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    requestToAPI(
      "https://api.themoviedb.org/3/discover/movie?&with_genres=16&page=2",
      options,
      setAnimationMovies
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header title={"Trending Movies"} />
      <Swiper content={trendingMovies} />
      <Header title={"Most watched Tv Shows"} />
      <Swiper content={trendingTvShows} />
      <Header title={"Popular people"} />
      <SwiperPeople content={popularPeople} />
      <Header title={"Tv Shows Airing Today"} />
      <Swiper content={airingToday} />
      <Header title={"Action Movies"} />
      <Swiper content={actionMovies} />
      <Header title={"Animation Movies"} />
      <Swiper content={animationMovies} />
    </div>
  );
};

export default Grid;
