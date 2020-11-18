import "./App.css";
import "./containers/Home/home.css";
import "./containers/Offer/offer.css";
import "./containers/Signup/signup.css";
import "./containers/Login/login.css";
import "./containers/Publish/publish.css";
import "./containers/Payment/payment.css";
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
import Payment from "./containers/Payment/Payment";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch);

function App() {
  //State pour stocker le token de l'utilisateur // Cookie.get ou null pour le garder ou non selon utilisateur (voir fonction setUser)
  const [token, setToken] = useState(Cookie.get("userToken") || null);

  const [id, setId] = useState(Cookie.get("userId") || null);

  //state pour activer le modal d'inscription ou non
  const [showModalSign, setShowModalSign] = useState(false);

  //state pour activer modal de connexion
  const [showModalLog, setShowModalLog] = useState(false);

  //state pour rediriger le user vers la page de vente
  const [fromPublish, setFromPublish] = useState(false);

  const setUser = (userToken, userId) => {
    if (userToken && userId) {
      Cookie.set("userToken", userToken);
      Cookie.set("userId", userId);
      setToken(userToken);
      setId(userId);
    } else {
      Cookie.remove("userToken");
      Cookie.remove("userId");
      setToken(null);
      setId(null);
    }
  };

  return (
    <Router>
      <Header
        token={token}
        setUser={setUser}
        setShowModalSign={setShowModalSign}
        setShowModalLog={setShowModalLog}
        setFromPublish={setFromPublish}
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
        fromPublish={fromPublish}
        setFromPublish={setFromPublish}
      />
      <Switch>
        <Route path="/offer/:id">
          <Offer token={token} setShowModalLog={setShowModalLog} userId={id} />
        </Route>
        <Route path="/publish">
          {token ? <Publish token={token} /> : <Redirect to="/" />}
        </Route>
        <Route path="/payment">
          <Payment />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
