import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MovieCardGrid from "../commons/MovieCardGrid";

const Account = () => {
  const user = useSelector((state) => state.user);
  const [switchTabs, setSwitchTabs] = useState(1);
  const [favouriteMovies, setFavouriteMovies] = useState();
  const favouriteMoviesArray = [];
  const [favouriteActors, setFavouriteActors] = useState();
  const favouriteActorsArray = [];
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
        `http://${process.env.REACT_APP_API_URL}/api/users/favourites/${user.email}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        res.data.length &&
          res.data.map((element) => {
            return axios
              .get(`https://api.themoviedb.org/3/movie/${element}`, options)
              .then((movie) => favouriteMoviesArray.push(movie.data))
              .catch((err) => console.error(err));
          });
      })
      .then(() => setFavouriteMovies(favouriteMoviesArray))
      .catch((err) => console.error(err));
  }, []); // eslint-disable-line
  useEffect(() => {
    axios
      .get(
        `http://${process.env.REACT_APP_API_URL}/api/users/favourite/actor/${user.email}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        response.data.map((actorId) => {
          return axios
            .get(`https://api.themoviedb.org/3/person/${actorId}`, options)
            .then((actor) => favouriteActorsArray.push(actor.data))
            .catch((err) => console.error(err));
        });
      })
      .then(() => setFavouriteActors(favouriteActorsArray))
      .catch((err) => console.error(err));
  }, [user]); // eslint-disable-line
  return (
    <div className="account-container">
      <div className="account-content-container">
        <aside className="side-bar-my-account">
          <button
            className="button-tab my-account"
            onClick={() => {
              setSwitchTabs(1);
            }}
            style={
              switchTabs === 1
                ? {
                    backgroundColor: "rgba(180, 28, 28, 0.664)",
                  }
                : { backgroundColor: "transparent" }
            }
          >
            <h2 className="h2-text-tab">Personal Information</h2>
          </button>
          <button
            className="button-tab my-account"
            onClick={() => {
              setSwitchTabs(2);
            }}
            style={
              switchTabs === 2
                ? {
                    backgroundColor: "rgba(180, 28, 28, 0.664)",
                  }
                : { backgroundColor: "transparent" }
            }
          >
            <h2 className="h2-text-tab">Favourite content</h2>
          </button>
          <button
            className="button-tab my-account"
            onClick={() => {
              setSwitchTabs(3);
            }}
            style={
              switchTabs === 3
                ? {
                    backgroundColor: "rgba(180, 28, 28, 0.664)",
                  }
                : { backgroundColor: "transparent" }
            }
          >
            <h2 className="h2-text-tab">Favourite actors</h2>
          </button>
        </aside>
        <div
          className="personal-information-container"
          style={{ display: switchTabs === 1 ? `flex` : `none` }}
        >
          <div className="inner-container">
            <div className="img-container">
              <img
                src="https://avataaars.io/?avatarStyle=Circle&topType=WinterHat4&accessoriesType=Blank&hatColor=White&facialHairType=BeardMedium&facialHairColor=BlondeGolden&clotheType=Hoodie&clotheColor=White&eyeType=Wink&eyebrowType=UnibrowNatural&mouthType=Twinkle&skinColor=Light"
                alt="your avatar"
              />
              <button className="edit-info-button">Editar informacion</button>
            </div>
            <div className="personal-data">
              <form action="submit">
                <h3>Nombre</h3>
                <input
                  type="text"
                  className="personal-info-input"
                  value={user.name}
                />
                <h3>Apellido</h3>
                <input
                  type="text"
                  className="personal-info-input"
                  value={user.last_name}
                />
                <h3>Email</h3>
                <input
                  type="text"
                  className="personal-info-input"
                  value={user.email}
                />
                <h3>Contraseña</h3>
                <input
                  type="text"
                  className="personal-info-input"
                  value={"**********"}
                />
              </form>
            </div>
          </div>
        </div>
        <div
          className="favourites-container"
          style={{ display: switchTabs === 2 ? `flex` : `none` }}
        >
          <div className="favourite-movies">
            <div className="h1-favourite-title-container">
              <h1 className="h1-favourite-title">
                <span id="span1">Your </span>favourite{" "}
                <span id="span2">content</span>
              </h1>
            </div>
            <MovieCardGrid content={favouriteMovies} />
          </div>
        </div>
        <div
          className="favourites-container"
          style={{ display: switchTabs === 3 ? `flex` : `none` }}
        >
          <div className="favourite-movies">
            <div className="h1-favourite-title-container">
              <h1 className="h1-favourite-title">
                <span id="span1">Your </span>favourite{" "}
                <span id="span2">actors</span>
              </h1>
            </div>
            <MovieCardGrid content={favouriteActors} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
