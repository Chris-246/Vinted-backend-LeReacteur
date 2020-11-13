import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Signup = ({ setUser }) => {
  //on récupère les infos rentrées par l'utilisateur dans une state générale qui servira de tableau d'objets (à envoyer ensuite en requête)
  const [userInfo, setUserInfo] = useState({});

  //on récupère chaque partie dans des states différents (à voir comment rendre ça plus efficace)
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  //fonction requête axios pour les données
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        userInfo
      );
      if (response.data.token) {
        setUser(response.data.token);
        history.push("/");
      } else {
        setUser(null);
        alert("Error in sign up");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //   useEffect(() => {
  //     fetchData(userInfo);
  //   }, [userInfo]);

  return (
    <div>
      <main>
        <form
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <input
            placeholder="Nom d'utilisateur"
            type="text"
            value={userName}
            onChange={(event) => {
              setUserName(event.target.value);
            }}
          ></input>
          <input
            placeholder="Adresse mail"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          ></input>
          <input
            placeholder="Mot de passe"
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          ></input>
          <button
            type="submit"
            onClick={() => {
              setUserInfo({
                email: email,
                username: userName,
                password: password,
              });
            }}
          >
            S'inscrire
          </button>
        </form>
      </main>
    </div>
  );
};

export default Signup;
