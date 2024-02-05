import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import MovieCardGrid from "./MovieCardGrid";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Toaster, toast } from "../../node_modules/sonner/dist";

const SingleActorCard = () => {
  const truncate = (bio) => {
    return bio.slice(0, 700) + (bio[700] === undefined ? "" : "...");
  };
  const navigate = useNavigate();
  const [currentActor, setCurrentActor] = useState();
  const [currentActorMovies, setCurrentActorMovies] = useState();
  const [currentActorTvShows, setCurrentActorTvShows] = useState();
  const [isFavouriteActor, setIsFavouriteActor] = useState();
  const [switchTabs, setSwitchTabs] = useState(
    parseInt(localStorage.getItem("actorTab"))
  );
  const params = useParams();
  const user = useSelector((state) => state.user);
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
  useEffect(() => {
    requestToAPI(
      `https://api.themoviedb.org/3/person/${currentActor?.id}/tv_credits`,
      options,
      setCurrentActorTvShows
    ); // eslint-disable-next-line
  }, [currentActor]);
  useEffect(() => {
    user.email &&
      axios
        .get(
          `http://localhost:3001/api/users/favourite/actor/exist/${user.email}/${currentActor?.id}`,
          { withCredentials: true }
        )
        .then((response) =>
          setIsFavouriteActor(response.data === "found" ? true : false)
        )
        .catch((err) => console.error(err));
  }, [isFavouriteActor, currentActor, user.email]);
  const handleFavouriteActor = () => {
    axios
      .post(`http://localhost:3001/api/users/favourite/actors`, {
        email: user.email,
        id: currentActor?.id,
      })
      .then(() =>
        isFavouriteActor
          ? toast.success("Removed from favourites")
          : toast.success("You added this actor to your favourites")
      )
      .catch((err) => console.error(err));
    setIsFavouriteActor();
  };
  return (
    <div className="single-actor-container">
      <div className="parent-single-movie" style={{ marginTop: "3%" }}>
        <div className="single-actor-img-container">
          <img
            src={`https://image.tmdb.org/t/p/w500/${currentActor?.profile_path}`}
            alt=""
            className="single-actor-img"
          />
          <button class="back-button" onClick={() => navigate(-1)}>
            <FaArrowLeftLong height={"1.5em"} width={"1.5em"} />
            Back
          </button>
        </div>
        <div style={{ marginLeft: "4%" }}>
          <div className="tabs-container">
            <button
              className="button-tab"
              onClick={() => {
                setSwitchTabs(1);
                localStorage.setItem("actorTab", 1);
              }}
              style={
                switchTabs === 1
                  ? { border: "1px solid rgb(230,63,63)" }
                  : { border: "none" }
              }
            >
              <h2 className="h2-text-tab">Personal Information</h2>
            </button>
            <button
              className="button-tab"
              onClick={() => {
                setSwitchTabs(2);
                localStorage.setItem("actorTab", 2);
              }}
              style={
                switchTabs === 2
                  ? { border: "1px solid rgb(230,63,63)" }
                  : { border: "none" }
              }
            >
              <h2 className="h2-text-tab" style={{ padding: "0 30px" }}>
                Movies
              </h2>
            </button>
            <button
              className="button-tab"
              onClick={() => {
                setSwitchTabs(3);
                localStorage.setItem("actorTab", 3);
              }}
              style={
                switchTabs === 3
                  ? { border: "1px solid rgb(230,63,63)" }
                  : { border: "none" }
              }
            >
              <h2 className="h2-text-tab" style={{ padding: "0 30px" }}>
                Tv Shows
              </h2>
            </button>
          </div>
          <div id="actor-birth">
            <div
              className="actor-personal-information-container"
              style={{
                flexDirection: "column",
                marginTop: "5%",
                display: switchTabs === 1 ? `flex` : `none`,
              }}
            >
              <h1>{currentActor?.name}</h1>
              <h2>Birthday: {currentActor?.birthday}</h2>
              <h2>{currentActor?.place_of_birth}</h2>
              <p>{currentActor ? truncate(currentActor.biography) : ""}</p>
              <div className="single-actor-button-container">
                <button
                  className="
                 home-button"
                  onClick={handleFavouriteActor}
                >
                  {isFavouriteActor
                    ? `I dont like this actor`
                    : `I love this actor`}
                </button>
                <Link
                  to={`https://www.google.com.ar/search?q=${currentActor?.name}`}
                  target="blank"
                >
                  <button
                    className="
                  home-button"
                  >
                    Learn more...
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div
            id="actor-movies"
            style={{ display: switchTabs === 2 ? `flex` : `none` }}
          >
            <div className="movies-from-actor-container">
              <MovieCardGrid content={currentActorMovies?.cast} />
            </div>
          </div>
          <div
            id="actor-movies"
            style={{ display: switchTabs === 3 ? `flex` : `none` }}
          >
            <div className="movies-from-actor-container">
              <MovieCardGrid content={currentActorTvShows?.cast} />
            </div>
          </div>
        </div>
      </div>
      <Toaster richColors position="bottom-right" />
    </div>
  );
};

export default SingleActorCard;
