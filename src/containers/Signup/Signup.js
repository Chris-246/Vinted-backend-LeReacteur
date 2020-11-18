import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Signup = ({ setUser, showModalSign, setShowModalSign }) => {
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
      if (response.data.token && response.data._id) {
        setUser(response.data.token, response.data._id);
        history.push("/");
        setShowModalSign(false);
      } else {
        setUser(null, null);
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
      {!showModalSign ? null : (
        <div>
          <div className="formContainer">
            <button
              className="exitInscription"
              onClick={() => {
                setShowModalSign(false);
              }}
            >
              X
            </button>
            <h2>S'inscrire</h2>
            <form
              className="signupForm"
              onSubmit={(event) => {
                handleSubmit(event);
              }}
            >
              <div>
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
              </div>

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
          </div>
          <main className="signup-main"></main>
        </div>
      )}
    </div>
  );
};

export default Signup;
