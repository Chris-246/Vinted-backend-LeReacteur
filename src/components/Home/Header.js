import React from "react";
import logo from "../../img/logo_vinted.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({
  token,
  setUser,
  setShowModalSign,
  setShowModalLog,
  setFromPublish,
}) => {
  return (
    <header className="headerContainer">
      <Link to="/">
        <img className="logo" src={logo} alt="logo de vinted" />
      </Link>
      <div className="articleSearch">
        <FontAwesomeIcon icon="search" className="iconSearch" />
        <input placeholder="Recherche article"></input>
      </div>

      {token ? (
        <button
          className="disconnect"
          onClick={() => {
            setUser(null, null);
          }}
        >
          Déconnexion
        </button>
      ) : (
        <div className="getStart">
          <button
            className="inscriptionButton"
            onClick={() => {
              setShowModalSign(true);
            }}
          >
            S'inscrire
          </button>
          <button
            className="connectButton"
            onClick={() => {
              setShowModalLog(true);
            }}
          >
            Se connecter
          </button>
        </div>
      )}

      <Link
        to="/publish"
        className="sellArticle"
        onClick={() => {
          if (!token) {
            setShowModalLog(true);
            setFromPublish(true);
          }
        }}
      >
        Vends tes articles
      </Link>
    </header>
  );
};

export default Header;
