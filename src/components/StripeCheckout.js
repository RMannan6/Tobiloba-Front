import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { createPaymentIntent } from "../functions/stripe.js";
import { Link } from "react-router-dom";
import { Card } from "antd";
import { DollarOutlined, CheckOutlined } from "@ant-design/icons";
import fish from "../square-icon-sivanes.png";
import { createOrder, emptyUserCart } from "../functions/user";
import { Blurple } from "./subcomponent/Blurple.js";

const StripeCheckout = ({ history }) => {
  const dispatch = useDispatch();
  const { user, deal } = useSelector((state) => ({ ...state }));

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  const [cartTotal, setCartTotal] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [payable, setPayable] = useState(0);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    createPaymentIntent(user.token, deal).then((res) => {
      console.log("create payment intent", res.data);
      setClientSecret(res.data.clientSecret);
      //additional response received on succesful payment
      setCartTotal(res.data.cartTotal);
      setTotalAfterDiscount(res.data.totalAfterDiscount);
      setPayable(res.data.payable);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); //so that page doesn't reload
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      //here you get result after successful payment
      //create order and save in database for admin to process
      createOrder(payload, user.token).then((res) => {
        if (res.data.ok) {
          //empty cart from local storage
          if (typeof window !== "undefined") localStorage.removeItem("cart");
          dispatch({
            type: "ADD_TO_CART",
            payload: [],
          });
          //reset coupon to false
          dispatch({
            type: "DEAL_APPLIED",
            payload: false,
          });
          emptyUserCart(user.token);
        }
      });

      //   console.log(JSON.stringify(payload, null, 4));
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  const handleChange = async (e) => {
    // listen for changes in the card element
    // and display any erros as the customer types their card details
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };
  return (
    <div>
      {!succeeded && (
        <div>
          {deal && totalAfterDiscount !== undefined ? (
            <p className="alert alert-success">{`Total after discount: $${totalAfterDiscount}`}</p>
          ) : (
            <p className="alert alert-danger">No deal code applied</p>
          )}
        </div>
      )}
      <div className="text-center pb-5">
        <Card
          style={{ objectFit: "contain" }}
          cover={
            <img
              src={fish}
              style={{
                height: "250px",
                width: "100%",
                alignSelf: "center",
                borderRadius: "7px",
                boxShadow:
                  "0px 0px 0px 0.5px rgba(50, 50, 93, 0.1), 0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07)",
                marginBottom: "-200px",
                marginTop: "-50px",
                objectFit: "cover",
                filter: "contrast(80%)",
              }}
            />
          }
          actions={[
            <>
              <DollarOutlined className="gold-text" /> <br /> Total: $
              {cartTotal.toFixed(2)}
            </>,
            <>
              <CheckOutlined className="grass-text" /> <br />
              Total payable : ${(payable / 100).toFixed(2)}
            </>,
          ]}
        />
      </div>
      <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={cardStyle}
          onChange={handleChange}
        />
        <button
          className="stripe-button"
          disabled={processing || disabled || succeeded}
        >
          <span id="button-text">
            {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
          </span>
        </button>
        <hr className="ultralight-border w-75" />
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        <br />
        <p className={succeeded ? "result-message" : "result-message hidden"}>
          Payment successful!
          <Link to="/user/history">Check your payment history.</Link>
        </p>
        <Blurple className="d-flex justify-content-end align-items-end cls-1" />
      </form>
    </div>
  );
};

export default StripeCheckout;
