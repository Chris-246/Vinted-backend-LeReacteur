import "./App.css";
import "./containers/Home/home.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./containers/Home/Home";
import Offer from "./containers/Offer/Offer";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  //useState pour récupérer les données qu'on va traiter
  const [data, setData] = useState({});

  //useState pour être sûr du chargement de la requête
  const [isLoading, setIsLoading] = useState(true);

  //fonction qui servira pour faire requête axios
  const fetchdata = async () => {
    const response = await axios.get(
      "https://lereacteur-vinted-api.herokuapp.com/offers"
    );
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <Router>
      <Switch>
        <Route path="/offer">
          <Offer />
        </Route>
        <Route path="/">
          <Home data={data} isLoading={isLoading} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
