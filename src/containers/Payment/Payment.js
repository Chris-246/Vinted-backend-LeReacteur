import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/Home/CheckoutForm";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe("pk_test_5z9rSB8XwuAOihoBixCMfL6X");

const Payment = () => {
  const location = useLocation();
  const { title, amount, id } = location.state;
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm title={title} amount={amount} id={id} />
    </Elements>
  );
};

export default Payment;
