import "./App.css";
import "./containers/Home/home.css";
import "./containers/Offer/offer.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./containers/Home/Home";
import Offer from "./containers/Offer/Offer";
import Signup from "./containers/Signup/Signup";
import Cookie from "js-cookie";
import { useState } from "react";
import Header from "./components/Home/Header";
import Login from "./containers/Login/Login";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch);

function App() {
  //State pour stocker le token de l'utilisateur // Cookie.get ou null pour le garder ou non selon utilisateur (voir fonction setUser)
  const [token, setToken] = useState(Cookie.get("token") || null);

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
      <Header token={token} setUser={setUser} />
      <Switch>
        <Route path="/offer/:id">
          <Offer />
        </Route>
        <Route path="/login">
          <Login setUser={setUser} />
        </Route>
        <Route path="/signup">
          <Signup setUser={setUser} />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
