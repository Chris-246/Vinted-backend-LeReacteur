import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = ({ setUser }) => {
  // revenir sur la page principale
  const history = useHistory();

  //création des states email et password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //création de la state qui recevra l'objet que nous enverrons sur la requête axios
  const [userInfo, setUserInfo] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        userInfo
      );
      if (response.data.token) {
        setUser(response.data.token);
        history.push("/");
      } else {
        setUser(null);
        alert("Wrong email address/password");
      }
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <main>
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <input
          type="email"
          placeholder="Adresse mail"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        ></input>
        <input
          type="password"
          placeholder="Mot de passe"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        ></input>
        <button
          type="submit"
          onClick={() => {
            setUserInfo({
              email: email,
              password: password,
            });
          }}
        >
          Se connecter
        </button>
      </form>
    </main>
  );
};

export default Login;
