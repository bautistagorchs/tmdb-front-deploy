import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const MoviesGrid = ({ content }) => {
  const navigate = useNavigate();
  const [currentMovies, setCurrentMovies] = useState(content.slice(0, 10));
  const [currentIndex, setCurrentIndex] = useState(10);
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    if (currentMovies.length === 0) {
      setCurrentMovies(content.slice(0, 10));
      // console.log("vacio", currentMovies.length);
    }
    const interval = setInterval(() => {
      // Cambiar a las otras 10 imágenes después de 10 segundos
      setCurrentMovies(content.slice(currentIndex, currentIndex + 10));
      setCurrentIndex((prevIndex) => (prevIndex + 10) % content.length);
    }, 10000);

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, [currentIndex, content]);

  return (
    <div className="movies-grid-container">
      <div className="content-conainer">
        <div className="text-container">
          <h3>
            <span className="span1"> Playing </span>
            <span className="span2"> at the</span>{" "}
            <span className="span3">moment!</span>
          </h3>
        </div>
        <div className="movies-container">
          {currentMovies.map((element, i) => (
            <div className={`movie${i + 1} first-child`} key={i}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${element.poster_path}`}
                alt=""
              />
              <div className="info-image-back-container">
                <div className="text-container">
                  <p className="p-movie-back">{element.title}</p>
                  <p
                    id="details"
                    onClick={() =>
                      navigate(`/${element?.media_type}/single/${element?.id}`)
                    }
                  >
                    Details
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviesGrid;
