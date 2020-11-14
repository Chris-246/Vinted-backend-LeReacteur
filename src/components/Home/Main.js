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
    <main className="home-main">
      <div className="home-container">
        <img
          src={mainPhoto}
          alt="principale menu principal"
          className="home-principal-image"
        />
        <div className="homeCube">
          <p>Prêts à faire du tri dans vos placards ?</p>
          <button className="beginSelling">Commencer à vendre</button>
        </div>
        <div className="homeFirstElement">
          <div className="offersArticles">
            {data.offers.map((item, index) => {
              return (
                <Link
                  to={`/Offer/${item._id}`}
                  key={index}
                  className="offerbox"
                >
                  <div className="offerUser">
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
                    className="productImage"
                  />
                  <div className="offerInfo">
                    <p>{item.product_price} €</p>
                    <p>{item.product_details[1].TAILLE}</p>
                    <p>{item.product_details[0].MARQUE}</p>
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
        </div>
      </div>
    </main>
  );
};

export default Main;
