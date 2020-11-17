import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import { Link, useHistory } from "react-router-dom";

const Offer = ({ token, setShowModalLog }) => {
  const history = useHistory();

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
        {data.product_pictures.length === 0 ? (
          <img
            src={data.product_image.secure_url}
            alt="uniquephoto"
            className="uniquePhoto"
          />
        ) : (
          <Carousel showThumbs={false} axis="horizontal" showArrows={true}>
            {data.product_pictures.map((picture, index) => {
              return (
                <div key={index}>
                  <img src={picture.secure_url} alt={`product ${index}`} />
                </div>
              );
            })}
          </Carousel>
        )}

        {/* <Carousel showThumbs={false} axis="horizontal" showArrows={true}>
          {data.product_pictures !== [] ? (
            data.product_pictures.map((picture, index) => {
              return (
                <div key={index}>
                  <img src={picture.secure_url} alt={`product ${index}`} />
                </div>
              );
            })
          ) : (
            <img src={data.product_image.secure_url} alt="uniquephoto" />
          )}
        </Carousel> */}

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

            <div className="userInformationOffer">
              {data.owner.account.avatar ? (
                <img
                  src={data.owner.account.avatar.secure_url}
                  alt="user avatar"
                  className="useravatarOffer"
                />
              ) : (
                <div></div>
              )}{" "}
              <p>{data.owner.account.username}</p>
            </div>
          </div>
          <button
            onClick={() => {
              if (token) {
                history.push("/payment", {
                  title: data.product_name,
                  amount: data.product_price,
                  id: data.owner._id,
                });
              } else {
                history.push("/");
                setShowModalLog(true);
              }
            }}
          >
            Acheter
          </button>
        </div>
      </div>
    </main>
  );
};

export default Offer;

// {token ? "/payment" : "/login"}
