import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MovieCardGrid from "../commons/MovieCardGrid";

const Account = () => {
  const user = useSelector((state) => state.user);
  const [favouriteMovies, setFavouriteMovies] = useState();
  const favouriteMoviesArray = [];
  const options = {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZTBiM2EwNDZhYTBmMDc2OWJmZjVkYjAzZjQxOGY5MCIsInN1YiI6IjY1M2ZiOWNmMTA5Y2QwMDEwYjA0ZDBmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wzku16fHNckt9N_jxJD8CVMYvcJwQqvohN8BD26tfxA",
    },
  };
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/users/favourites/${user.email}`, {
        withCredentials: true,
      })
      .then((res) => {
        res.data.length &&
          res.data.map((element) => {
            axios
              .get(`https://api.themoviedb.org/3/movie/${element}`, options)
              .then((movie) => favouriteMoviesArray.push(movie.data))
              .catch((err) => console.error(err));
          });
      })
      .then(() => setFavouriteMovies(favouriteMoviesArray))
      .catch((err) => console.error(err));
  }, [user]);

  // console.log("favourite movies", favouriteMovies);
  return (
    <div className="account-container">
      <div className="account-content-container">
        {/* <div className="personal-information-container">
          <div className="inner-container">
            <div className="img-container">
              <img src="https://avataaars.io/?avatarStyle=Circle&topType=WinterHat4&accessoriesType=Blank&hatColor=White&facialHairType=BeardMedium&facialHairColor=BlondeGolden&clotheType=Hoodie&clotheColor=White&eyeType=Wink&eyebrowType=UnibrowNatural&mouthType=Twinkle&skinColor=Light" />
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
        </div> */}
        {/* <div className="watchlist-container"></div> */}
        <div className="favourites-container">
          <div className="favourite-movies">
            <div className="h1-favourite-title-container">
              <h1 className="h1-favourite-title">
                <span id="span1">Your </span>favourite{" "}
                <span id="span2">movies</span>
              </h1>
            </div>
            <MovieCardGrid movies={favouriteMovies} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
