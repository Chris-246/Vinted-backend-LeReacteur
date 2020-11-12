import axios from "axios";
import React, { useState } from "react";
import Header from "../../components/Home/Header";

const Signup = ({ setUser, setToken, token }) => {
  //on récupère les infos rentrées par l'utilisateur dans une state générale qui servira de tableau d'objets (à envoyer ensuite en requête)
  const [userInfo, setUserInfo] = useState({});

  //on récupère chaque partie dans des states différents (à voir comment rendre ça plus efficace)
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  //fonction requête axios pour les données
  const fetchData = async () => {
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        userInfo
      );
      console.log(response.data.token);

      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  //   useEffect(() => {
  //     fetchData(userInfo);
  //   }, [userInfo]);

  return (
    <div>
      <Header />
      <main>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            // console.log(userName, email, password);
          }}
        >
          <input
            placeholder="Nom d'utilisateur"
            type="text"
            onChange={(event) => {
              setUserName(event.target.value);
            }}
          ></input>
          <input
            placeholder="Adresse mail"
            type="email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          ></input>
          <input
            placeholder="Mot de passe"
            type="password"
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
                phone: "0645728176",
                password: password,
              });

              fetchData();
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
