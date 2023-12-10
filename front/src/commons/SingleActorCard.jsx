import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import MovieCardGrid from "./MovieCardGrid";

const SingleActorCard = () => {
  const truncate = (bio) => {
    console.log(bio[1500]);
    return bio.slice(0, 700) + (bio[700] === undefined ? "" : "...");
  };
  const [currentActor, setCurrentActor] = useState();
  const [currentActorMovies, setCurrentActorMovies] = useState();
  const [switchTabs, setSwitchTabs] = useState(1);
  const params = useParams();
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
      .then((response) => setData(response.data))
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    requestToAPI(
      `https://api.themoviedb.org/3/person/${params.id}?language=en-US`,
      options,
      setCurrentActor
    ); // eslint-disable-next-line
  }, []);
  useEffect(() => {
    requestToAPI(
      `https://api.themoviedb.org/3/person/${currentActor?.id}/movie_credits`,
      options,
      setCurrentActorMovies
    ); // eslint-disable-next-line
  }, [currentActor]);
  return (
    <div className="single-actor-container">
      <div class="parent-single-movie">
        <div class="div1">
          <img
            src={`https://image.tmdb.org/t/p/w500/${currentActor?.profile_path}`}
            alt=""
          />
        </div>
        <div id="actor-birth" class="div2">
          <div className="tabs-container">
            <button
              className="button-tab"
              onClick={() => {
                setSwitchTabs(1);
              }}
            >
              <h2 className="h2-text-tab">Personal Information</h2>
            </button>
            <button
              className="button-tab"
              onClick={() => {
                setSwitchTabs(2);
              }}
            >
              <h2 className="h2-text-tab" style={{ padding: "0 30px" }}>
                Movies
              </h2>
            </button>
          </div>
          <div
            className="actor-personal-information-container"
            style={{
              flexDirection: "column",
              marginTop: "5%",
              display: switchTabs === 1 ? `flex` : `none`,
            }}
          >
            <h1>{currentActor?.name}</h1>
            <h2>Birth: {currentActor?.birthday}</h2>
            <h2 id="actor-birth">{currentActor?.place_of_birth}</h2>
            <p>{currentActor ? truncate(currentActor.biography) : ""}</p>
          </div>
        </div>
        <div
          id="actor-movies"
          class="div3"
          style={{ display: switchTabs === 2 ? `flex` : `none` }}
        >
          <div className="movies-from-actor-container">
            <MovieCardGrid movies={currentActorMovies?.cast} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleActorCard;
