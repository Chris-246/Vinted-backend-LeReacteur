import React, { useEffect, useState } from "react";
import Main from "../../components/Home/Main";
import axios from "axios";

const Home = () => {
  //useState pour récupérer les données qu'on va traiter
  const [data, setData] = useState({});

  //useState pour être sûr du chargement de la requête
  const [isLoading, setIsLoading] = useState(true);

  // Création state pour la pagination
  const [page, setPage] = useState(1);

  //fonction qui servira pour faire requête axios
  const fetchdata = async (page) => {
    const response = await axios.get(
      `https://lereacteur-vinted-api.herokuapp.com/offers?page=${page}&limit=5`
    );
    setData(response.data);
    setIsLoading(false);
  };

  // Ne charger la page qu'au changement du state page
  useEffect(() => {
    fetchdata(page);
  }, [page]);

  //
  return (
    <div>
      <Main isLoading={isLoading} data={data} setPage={setPage} />
    </div>
  );

  //   <Link to="/Offer">Aller voir l'offre</Link>;
};

export default Home;
