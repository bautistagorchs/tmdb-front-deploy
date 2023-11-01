import axios from "axios";
import React, { useState } from "react";
import Card from "../commons/Card";
import { useEffect } from "react";

const Movies = () => {
  const [element, setElement] = useState({});
  console.log("i am the element", element);
  useEffect(() => {
    const options = {
      params: { language: "en-US" },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZTBiM2EwNDZhYTBmMDc2OWJmZjVkYjAzZjQxOGY5MCIsInN1YiI6IjY1M2ZiOWNmMTA5Y2QwMDEwYjA0ZDBmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wzku16fHNckt9N_jxJD8CVMYvcJwQqvohN8BD26tfxA",
      },
    };
    axios
      .get("https://api.themoviedb.org/3/trending/movie/day", options)
      .then(function (response) {
        setElement(response.data.results);
        //console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);
  return (
    <div>
      <h1>Movies section</h1>
      <button>requestToAPI</button>
      {element[0].id &&
        element.map((element, i) => (
          <div key={i}>
            <Card card={element} />
          </div>
        ))}
    </div>
  );
};

export default Movies;
