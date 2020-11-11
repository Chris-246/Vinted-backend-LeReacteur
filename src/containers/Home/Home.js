import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Home/Header";
import Main from "../../components/Home/Main";

const Home = ({ isLoading, data }) => {
  return (
    <div>
      <Header />
      <Main isLoading={isLoading} data={data} />
    </div>
  );

  //   <Link to="/Offer">Aller voir l'offre</Link>;
};

export default Home;
