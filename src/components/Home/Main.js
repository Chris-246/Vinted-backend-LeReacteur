import React from "react";
import mainPhoto from "../../img/home-main.jpg";
import { Link } from "react-router-dom";

const Main = ({ data, isLoading }) => {
  return (
    <main>
      <div>
        <img
          src={mainPhoto}
          alt="principale menu principal"
          className="home-principal-image"
        />
      </div>
      {isLoading ? (
        <span>Page is loading ...</span>
      ) : (
        <div className="offers container">
          {data.offers.map((item, index) => {
            return (
              <Link to="/Offer">
                <div key={index} className="offerbox">
                  <div className="offer-user">
                    <img
                      src={item.owner.account.avatar.secure_url}
                      alt="user avatar"
                      className="useravatar"
                    />{" "}
                    {item.owner.account.username}
                  </div>
                  <img
                    src={item.product_image.secure_url}
                    alt="product"
                    className="product-image"
                  />
                  <div>
                    <p>{item.product_price} €</p>
                    <p>{item.product_details[1].TAILLE}</p>
                    <p>{item.product_details[0].MARQUE}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
};

export default Main;
