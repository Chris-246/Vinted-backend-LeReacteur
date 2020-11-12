import React from "react";
import mainPhoto from "../../img/home-main.jpg";
import { Link } from "react-router-dom";

const Main = ({ data, isLoading, setPage }) => {
  //créatin de constante pour le nombre max de pages
  const maxPages = Math.ceil(data.count / 5);

  //définition de ce qui vont être les pages
  const numPages = [];
  for (let i = 1; i <= maxPages; i++) {
    numPages.push(i);
  }

  return isLoading ? (
    <span>Page is loading ...</span>
  ) : (
    <main>
      <div>
        <img
          src={mainPhoto}
          alt="principale menu principal"
          className="home-principal-image"
        />
      </div>
      <div className="offers container">
        {data.offers.map((item, index) => {
          return (
            <Link to={`/Offer/${item._id}`}>
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
      <ul className="pagination">
        {numPages.map((page, index) => {
          return (
            <li
              key={index}
              onClick={() => {
                setPage(page);
              }}
            >
              {page}
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default Main;
