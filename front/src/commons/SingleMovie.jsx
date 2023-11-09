import React, { useEffect, useState } from "react";
import Navbar from "../commons/Navbar";
import { useLocation, useParams } from "react-router";
import axios from "axios";
import { useSelector } from "react-redux";

const SingleMovie = () => {
  const user = useSelector((state) => state.user);
  // console.log("este es el user.email", user.email);
  const params = useParams();
  const location = useLocation();
  // eslint-disable-next-line
  const [currentMovie, setCurrentMovie] = useState();
  const [existingFavourite, setExistingFavourite] =
    useState("Add to favourites");

  // console.log(currentMovie);
  //styles
  useEffect(() => {
    location.pathname === `/${params.media_type}/single/${params.id}` &&
      document.body.classList.add("single-movie");
    return () => {
      document.body.classList.remove("single-movie");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
  const handleClickFavourites = () => {
    user.email
      ? axios
          .post(
            `http://localhost:3001/api/users/favourites`,
            { email: user.email, newFavourite: currentMovie.id },
            { withCredentials: true }
          )
          .then(() => console.log("added to favourites"))
          .catch((err) => console.error("that did not go well"))
      : console.log("for now no habia email");
    setExistingFavourite("Remove from fravourites");
  };
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
        `https://api.themoviedb.org/3/${params.media_type}/${params.id}?language=en-US`,
        options
      )
      .then((response) => {
        setCurrentMovie(response.data);
      })
      .catch(() => {
        axios
          .get(
            `https://api.themoviedb.org/3/tv/${params.id}?language=en-US`,
            options
          )
          .then((response) => {
            setCurrentMovie(response.data);
          })
          .catch(() => {
            axios
              .get(
                `https://api.themoviedb.org/3/movie/${params.id}?language=en-US`,
                options
              )
              .then((response) => {
                setCurrentMovie(response.data);
              })
              .catch((err) => console.error(err));
          });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    user.email &&
      axios
        .get(
          `http://localhost:3001/api/users/favourites/exist/${user.email}/${currentMovie?.id}`,
          {
            withCredentials: true,
          }
        )
        .then(() => setExistingFavourite("Remove from favourites"))
        .catch(() => {});
  });
  // console.log(existingFavourite);
  return (
    <div className="div-container-single-movie-page">
      <Navbar />
      <div className="single-movie-container">
        <div class="parent-single-movie">
          <div class="div1">
            <img
              src={`https://image.tmdb.org/t/p/w500/${currentMovie?.poster_path}`}
              alt=""
            />
          </div>
          <div class="div2">
            <h1>
              {currentMovie?.title}
              {currentMovie?.name}
            </h1>
            <h2>{currentMovie?.tagline}</h2>
            <h3>
              Genres: {" - "}
              {currentMovie &&
                currentMovie.genres.map((e, i) => e.name + " - ")}
              {"no genres available"}
            </h3>
            <h3>
              Released on: {currentMovie?.release_date}{" "}
              {currentMovie?.first_air_date}
            </h3>
            <p>{currentMovie?.overview}</p>
          </div>
          <div class="div3">
            <button className="home-button" onClick={handleClickFavourites}>
              {existingFavourite}
            </button>
            {/* <button className="home-button" onClick={toggleFavouritesButton}>
              check favourites
            </button> */}
            <button id="button-trailer" className="home-button">
              <a
                className="tag-a-trailer"
                href={`https://www.youtube.com/results?search_query=${
                  currentMovie?.name || currentMovie?.title
                }+trailer`}
                target="blank"
              >
                Watch Trailer
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleMovie;
