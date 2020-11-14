import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";

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
    <main className="main">
      <div className="offerContainer">
        <Carousel showThumbs={false} axis="horizontal" showArrows={true}>
          {data.product_pictures.map((picture, index) => {
            return (
              <div key={index}>
                <img src={picture.secure_url} alt={`product ${index}`} />
              </div>
            );
          })}
        </Carousel>

        {/* Information part */}

        <div className="product-details">
          {/* On récupère les infos du produit */}
          <div className="price">{data.product_price} €</div>
          <ul className="information">
            {data.product_details.map((detail, index) => {
              const cle = Object.keys(detail);

              return (
                <li key={index}>
                  <div>{cle[0]}</div> <div>{detail[cle[0]]}</div>
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
                className="useravatarOffer"
              />{" "}
              <p>{data.owner.account.username}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Offer;
