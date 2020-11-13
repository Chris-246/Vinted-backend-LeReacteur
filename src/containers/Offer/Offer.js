import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Offer = () => {
  //useState pour récupérer les données qu'on va traiter
  const [data, setData] = useState({});

  //useState pour être sûr du chargement de la requête
  const [isLoading, setIsLoading] = useState(true);

  //on récupère l'id envoyé en le destructurant directement
  const { id } = useParams();

  //fonction pour la requête axios spécifique à l'id de l'offre
  const fetchdata = async (identification) => {
    const response = await axios.get(
      `https://lereacteur-vinted-api.herokuapp.com/offer/${identification}`
    );
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchdata(id);
  }, [id]);

  return isLoading ? (
    <div>Page is loading ...</div>
  ) : (
    <div>
      <main>
        <div className="product-images">
          <img src={data.product_pictures[0].secure_url} alt="product" />
        </div>
        <div className="product-details">
          {/* On récupère les infos du produit */}
          <div>{data.product_price}</div>
          <ul>
            {data.product_details.map((detail, index) => {
              const cle = Object.keys(detail);

              return (
                <li key={index}>
                  {cle[0]} {detail[cle[0]]}
                </li>
              );
            })}
          </ul>
          {/* On récupères les infos du user */}
          <div className="general-details">
            <div>{data.product_name}</div>

            <div>{data.product_description}</div>

            <div>
              <img
                src={data.owner.account.avatar.secure_url}
                alt="user avatar"
                className="useravatar"
              />{" "}
              {data.owner.account.username}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Offer;
