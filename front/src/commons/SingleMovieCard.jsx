import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SingleMovieCard = () => {
  const user = useSelector((state) => state.user);
  const params = useParams();
  const [currentMovie, setCurrentMovie] = useState();
  const [existingFavourite, setExistingFavourite] = useState(false);
  const [tab, setTab] = useState(1);

  const handleClickFavourites = () => {
    user.email
      ? axios
          .post(
            `http://localhost:3001/api/users/favourites`,
            { email: user.email, newFavourite: currentMovie.id },
            { withCredentials: true }
          )
          .then(() => {})
          .catch((err) => console.error("that did not go well"))
      : console.log("for now no habia email");
    setExistingFavourite();
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
        .then((response) =>
          response.data === "found"
            ? setExistingFavourite(true)
            : setExistingFavourite(false)
        )
        .catch(() => {});
  }, [currentMovie, existingFavourite]);
  return (
    <div className="single-movie-container">
      <div class="parent-single-movie">
        <div class="div1">
          <img
            src={`https://image.tmdb.org/t/p/w500/${currentMovie?.poster_path}`}
            alt=""
          />
        </div>
        {tab === 1 ? (
          <div className="single-movie-info-container">
            <div
              className="div2 smcdiv2"
              style={{
                flexDirection: "column",
                margin: "5vh 0",
              }}
            >
              <h1>
                {currentMovie?.title}
                {currentMovie?.name}
              </h1>
              <h2>{currentMovie?.tagline}</h2>
              <h3>
                Genres: {" - "}
                {currentMovie?.genres
                  ? currentMovie.genres.map((e) => e.name + " - ")
                  : "no genres available"}
              </h3>
              <h3>
                Released on: {currentMovie?.release_date}{" "}
                {currentMovie?.first_air_date}
              </h3>
              <p>{currentMovie?.overview}</p>
            </div>
            <div class="div3">
              <button className="home-button" onClick={handleClickFavourites}>
                {existingFavourite
                  ? `Remove from favourites`
                  : `Add to favourites`}
              </button>
              <Link
                target="blank"
                to={`https://www.youtube.com/results?search_query=${
                  currentMovie?.name || currentMovie?.title
                }+trailer`}
              >
                <button id="button-trailer" className="home-button">
                  <p className="tag-a-trailer" style={{ margin: "unset" }}>
                    Watch Trailer
                  </p>
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="trailer-container">
            <iframe
              width="1000"
              height="591"
              src="https://www.youtube.com/embed/VWavstJydZU?si=cZ7aKrYRO17Q8r-t"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleMovieCard;
