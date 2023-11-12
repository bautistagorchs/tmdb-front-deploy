import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const SingleActorCard = () => {
  const truncate = (bio) => {
    return bio.slice(0, 700) + "...";
  };
  const [currentActor, setCurrentActor] = useState();
  const params = useParams();

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
        `https://api.themoviedb.org/3/person/${params.id}?language=en-US`,
        options
      )
      .then((response) => setCurrentActor(response.data))
      .catch(() => {});
    // eslint-disable-next-line
  }, []);
  return (
    <div className="single-movie-container">
      <div class="parent-single-movie">
        <div class="div1">
          <img
            src={`https://image.tmdb.org/t/p/w500/${currentActor?.profile_path}`}
            alt=""
          />
        </div>
        <div id="actor-birth" class="div2">
          <h1>{currentActor?.name}</h1>
          <h2>Birth: {currentActor?.birthday}</h2>
          <h2 id="actor-birth">{currentActor?.place_of_birth}</h2>
          <p>{currentActor ? truncate(currentActor.biography) : ""}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleActorCard;
