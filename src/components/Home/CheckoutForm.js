import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useHistory } from "react-router-dom";

const CheckoutForm = ({ title, amount, id }) => {
  const history = useHistory();
  //pour faire la requête stripe
  const stripe = useStripe();

  //pour récupérer les infos de la carte bancaire rentrées par utilisateur
  const elements = useElements();

  // création de la state qui donnera condition d'affichagee selon succès de paiement
  const [completed, setCompleted] = useState(false);

  //création du total à payer
  const amountNum = Number(amount);
  const totalToPay = amountNum + 0.4 + 0.8;

  //création de la fonction pour gérer le submit : 2 requêtes (une stripe pour réception du token et une axios pour envoyer ce token)
  const handleSubmit = async (event) => {
    event.preventDefault();

    //on récupère les infos de la carte
    const cardElements = elements.getElement(CardElement);

    //requête stripe pour recevoir le token

    const stripeResponse = await stripe.createToken(cardElements, {
      name: id,
    });
    const stripeToken = stripeResponse.token.id;

    //réception de token de stripe faite => requête axios pour finir de valider
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          token: stripeToken,
          title: title,
          amount: totalToPay.toFixed(2),
        }
      );
      //récupération du status envoyé par notre serveur (status récupéré par le serveur suite à une requête)
      const status = response.data.status;
      if (status === "succeeded") {
        setCompleted(true);
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  return !completed ? (
    // <div className="mainPayment">
    <div className="paymentWrapper">
      <div className="pricesInformation">
        <p>Résumé de la commande</p>
        <ul>
          <li>
            <span>Commande: {title}</span> <span>{amount} €</span>
          </li>
          <li>
            <span>Frais protection des acheteurs</span> <span>0.40 €</span>
          </li>
          <li>
            <span>Frais de port</span> <span>0.80 €</span>
          </li>
        </ul>
      </div>
      <form onSubmit={handleSubmit} className="paymentInformation">
        <div>
          <span>TOTAL</span> <span>{totalToPay.toFixed(2)} €</span>
        </div>
        <CardElement />
        <button type="submit">Payer</button>
      </form>
    </div>
  ) : (
    // </div>
    <div>
      <p>Merci, le paiement a été effectué</p>
      <button
        onClick={() => {
          history.push("/");
        }}
      >
        Retour à la page principale
      </button>
    </div>
  );
};

export default CheckoutForm;
