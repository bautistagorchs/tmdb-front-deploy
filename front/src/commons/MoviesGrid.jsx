import React, { useEffect, useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const MoviesGrid = ({ content }) => {
  const navigate = useNavigate();
  const [currentMovies, setCurrentMovies] = useState(content.slice(0, 10));
  const [currentIndex, setCurrentIndex] = useState(10);
  useEffect(() => {
    if (currentMovies.length === 0) {
      setCurrentMovies(content.slice(0, 10));
    }
    const interval = setInterval(() => {
      setCurrentMovies(content.slice(currentIndex, currentIndex + 10));
      setCurrentIndex((prevIndex) => (prevIndex + 10) % content.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [currentIndex, content, currentMovies.length]);

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
            <div className={`movie${i + 1} first-child cursor-pointer`} key={i}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${element.poster_path}`}
                alt=""
              />
              <div className="info-image-back-container">
                <div className="text-container">
                  <p className="p-movie-back">- {element.title} -</p>
                  <p
                    id="details"
                    onClick={() =>
                      navigate(`/${element?.media_type}/single/${element?.id}`)
                    }
                  >
                    Details
                    <MdArrowOutward />
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
