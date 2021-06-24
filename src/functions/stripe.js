import axios from "axios";

export const createPaymentIntent = (authtoken, deal) =>
  axios.post(
    `${process.env.REACT_APP_API}/create-payment-intent`,
    { dealApplied: deal },
    {
      headers: {
        authtoken,
      },
    }
  );
