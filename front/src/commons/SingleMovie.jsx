import React, { useEffect, useState } from "react";
import Navbar from "../commons/Navbar";
import { useLocation, useParams } from "react-router";
import axios from "axios";

const SingleMovie = () => {
  const params = useParams();
  const location = useLocation();
  // eslint-disable-next-line
  const [currentMovie, setCurrentMovie] = useState();
  console.log(currentMovie);
  //styles
  useEffect(() => {
    location.pathname === `/movies/single/${params.id}` &&
      document.body.classList.add("single-movie");
    return () => {
      document.body.classList.remove("single-movie");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
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
        `https://api.themoviedb.org/3/movie/${params.id}?language=en-US`,
        options
      )
      .then((response) => {
        setCurrentMovie(response.data);
      })
      .catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const genres = () => {
    const text = "";
    text += currentMovie.genres[0].name;
    return text;
  };

  return (
    <div className="div-container-single-movie-page">
      <Navbar />
      //{" "}
      <div className="single-movie-container">
        <div class="parent-single-movie">
          <div class="div1">
            <img
              src={`https://image.tmdb.org/t/p/w500/${currentMovie?.poster_path}`}
              alt=""
            />
          </div>
          <div class="div2">
            <h1>{currentMovie?.title}</h1>
            <h2>{currentMovie?.tagline}</h2>
            <h3>
              Genres: {" - "}
              {currentMovie &&
                currentMovie.genres.map((e, i) => e.name + " - ")}
            </h3>
            <h3>Released on: {currentMovie?.release_date}</h3>
            <p>{currentMovie?.overview}</p>
          </div>
          <div class="div3"></div>
        </div>
      </div>
    </div>
  );
};

export default SingleMovie;

// <div className="single-movie-container">
//   {/* <div className="movie-container"> */}
//   <div className="img-container">
//     <img
//       src={`https://image.tmdb.org/t/p/w500/${currentMovie?.poster_path}`}
//       alt=""
//     />
//   </div>
//   <div className="description-container">
// <p>{currentMovie?.overview}</p>
//   </div>
//   <div className="title-container">
//     <h1>{currentMovie?.title}</h1>
//   </div>
//   {/* </div> */}
// </div>
