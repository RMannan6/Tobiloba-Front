import React from "react";

const ShowPaymentInfo = ({ order, showStatus = true }) => (
  <>
    <p>
      <span className="xsmall-text bold">
        Order no: {order.paymentIntent.id}
      </span>
      {" • "}
      <span className="xsmall-text grass-text">
        Amount:{"  "}
        {(order.paymentIntent.amount /= 100).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </span>
      {" • "}
      <span className="xsmall-text gold-text">
        Currency: {order.paymentIntent.currency.toUpperCase()}
      </span>
      {" • "}
      <span className="xsmall-text bold">
        Method: {order.paymentIntent.payment_method_types[0]}
      </span>
      {" • "}
      <span className="xsmall-text volcano-text">
        Payment: {order.paymentIntent.status.toUpperCase()}
      </span>
      {" • "}
      <span className="xsmall-text bold">
        Ordered on:
        {new Date(order.paymentIntent.created * 1000).toLocaleString()}
      </span>
      {" • "}
      <br />
      {showStatus && (
        <span className="badge bg-primary text-white">
          STATUS: {order.orderStatus}
        </span>
      )}
    </p>
  </>
);

export default ShowPaymentInfo;
