import React from "react";
import logo from "../../img/logo_vinted.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ token, setUser }) => {
  return (
    <header className="header container">
      <Link to="/">
        <img className="logo" src={logo} alt="logo de vinted" />
      </Link>
      <div className="articleSearch">
        <FontAwesomeIcon icon="search" className="iconSearch" />
        <input placeholder="Recherche article"></input>
      </div>

      {token ? (
        <button
          className="connect"
          onClick={() => {
            setUser(null);
          }}
        >
          Déconnexion
        </button>
      ) : (
        <div className="getStart">
          <Link to="/signup" className="inscriptionButton">
            S'inscrire
          </Link>
          <Link to="/login" className="connectButton">
            Se connecter
          </Link>
        </div>
      )}

      <button className="sellArticle">Vends tes articles</button>
    </header>
  );
};

export default Header;
