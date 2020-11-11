import React from "react";
import logo from "../../img/logo_vinted.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header container">
      <Link to="/">
        <img className="logo" src={logo} alt="logo de vinted" />
      </Link>

      <input placeholder="Recherche article"></input>
      <div>
        <button>S'inscrire</button>
        <button>Se connecter</button>
      </div>

      <button>Vends tes articles</button>
    </header>
  );
};

export default Header;
