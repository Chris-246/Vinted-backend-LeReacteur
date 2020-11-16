import "./App.css";
import "./containers/Home/home.css";
import "./containers/Offer/offer.css";
import "./containers/Signup/signup.css";
import "./containers/Login/login.css";
import "./containers/Publish/publish.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./containers/Home/Home";
import Offer from "./containers/Offer/Offer";
import Signup from "./containers/Signup/Signup";
import Cookie from "js-cookie";
import { useState } from "react";
import Header from "./components/Home/Header";
import Login from "./containers/Login/Login";
import Publish from "./containers/Publish/Publish";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch);

function App() {
  //State pour stocker le token de l'utilisateur // Cookie.get ou null pour le garder ou non selon utilisateur (voir fonction setUser)
  const [token, setToken] = useState(Cookie.get("userToken") || null);

  //state pour activer le modal d'inscription ou non
  const [showModalSign, setShowModalSign] = useState(false);

  //state pour activer modal de connexion
  const [showModalLog, setShowModalLog] = useState(false);

  const setUser = (userToken) => {
    if (userToken) {
      Cookie.set("userToken", userToken);
      setToken(userToken);
    } else {
      Cookie.remove("userToken");
      setToken(null);
    }
  };

  return (
    <Router>
      <Header
        token={token}
        setUser={setUser}
        setShowModalSign={setShowModalSign}
        setShowModalLog={setShowModalLog}
      />
      <Signup
        setUser={setUser}
        showModalSign={showModalSign}
        setShowModalSign={setShowModalSign}
      />
      <Login
        setUser={setUser}
        showModalLog={showModalLog}
        setShowModalLog={setShowModalLog}
      />
      <Switch>
        <Route path="/offer/:id">
          <Offer />
        </Route>
        <Route path="/publish">
          {token ? <Publish token={token} /> : <Redirect to="/" />}
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
