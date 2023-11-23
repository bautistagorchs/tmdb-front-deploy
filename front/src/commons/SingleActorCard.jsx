import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const SingleActorCard = () => {
  const truncate = (bio) => {
    return bio.slice(0, 700) + "...";
  };
  const [currentActor, setCurrentActor] = useState();
  const [currentActorMovies, setCurrentActorMovies] = useState();
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
  // useEffect(() => {
  //   requestToAPI(
  //     `https://api.themoviedb.org/3/person/${currentActor?.id}/movie_credits`,
  //     options,
  //     setCurrentActorMovies
  //   ); // eslint-disable-next-line
  // }, []);
  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/person/1373737/movie_credits`, options)
      .then((response) => console.log(response.data.cast))
      .catch((err) => console.error(err));
  }, []);
  console.log(currentActorMovies);
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
            <button className="button-tab">
              <h2 className="h2-text-tab">1</h2>
            </button>
            <button className="button-tab">
              <h2 className="h2-text-tab">2</h2>
            </button>
          </div>
          <div className="personal-information-container">
            <h1>{currentActor?.name}</h1>
            <h2>Birth: {currentActor?.birthday}</h2>
            <h2 id="actor-birth">{currentActor?.place_of_birth}</h2>
            <p>{currentActor ? truncate(currentActor.biography) : ""}</p>
          </div>
        </div>
        <div class="div3">
          <div className="movies-from-actor-container">
            <h1>{currentActor?.name}</h1>
            <h2>Birth: {currentActor?.birthday}</h2>
            <h2 id="actor-birth">{currentActor?.place_of_birth}</h2>
            <p>{currentActor ? truncate(currentActor.biography) : ""}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleActorCard;
