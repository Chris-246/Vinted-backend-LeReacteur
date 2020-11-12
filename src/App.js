import "./App.css";
import "./containers/Home/home.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./containers/Home/Home";
import Offer from "./containers/Offer/Offer";
import Signup from "./containers/Signup/Signup";
import Cookie from "js-cookie";
import { useState } from "react";

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
      <Switch>
        <Route path="/offer/:id">
          <Offer />
        </Route>
        <Route path="/signup">
          <Signup setUser={setUser} setToken={setToken} token={token} />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
