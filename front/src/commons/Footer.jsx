import React, { useEffect } from "react";
import GithubIcon from "../utils/GithubIcon";
import LinkedinIcon from "../utils/LinkedinIcon";
import { Link, useLocation } from "react-router-dom";
import GmailIcon from "../utils/GmailIcon";
import { useSelector } from "react-redux";

const Footer = () => {
  const user = useSelector((state) => state.user);
  const { pathname } = useLocation();
  useEffect(() => {
    if (user.email) {
      document.querySelector(".footer-container").style.display = "flex";
    }
    if (pathname === `/`) {
      document
        .querySelector(".footer-container")
        .classList.add(`footer-container-index`);
    } else {
      document
        .querySelector(".footer-container")
        .classList.remove(`footer-container-index`);
    }
  }, [user, pathname]);
  return (
    <div className="footer-container">
      <div className="footer-content-container">
        <div className="rights-container">
          <Link to={`https://github.com/bautistagorchs`} target="blank">
            <div className="content-container">
              <GithubIcon />
              <p>Github</p>
            </div>
          </Link>
          <Link
            to={`https://www.linkedin.com/in/bautista-gorchs-453279278/`}
            target="blannk"
          >
            <div className="content-container">
              <LinkedinIcon />
              <p>Linkedin</p>
            </div>
          </Link>
          <Link to={``} target="blannk">
            <div className="content-container">
              <GmailIcon />
              <p>Email</p>
            </div>
          </Link>
        </div>
        <div className="info-container">
          <a href="http://" target="_blank">
            <p className="info-footer">Sobre el proyecto</p>
          </a>
          <a href="http://" target="_blank">
            <p className="info-footer">Herramientas</p>
          </a>
          <a href="http://" target="_blank">
            <p className="info-footer">Algo mas</p>
          </a>
        </div>
        <div className="logo-container">
          <Link to={`/main`}>
            <img
              src={
                "https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
              }
              alt="no se encontro la imagen"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
