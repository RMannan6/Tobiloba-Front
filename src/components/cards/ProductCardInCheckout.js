import React from "react";
import ModalImage from "react-modal-image";
import fish from "../../square-icon-sivanes.png";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  CheckCircleOutlined,
  CloseOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

const ProductCardInCheckout = ({ p }) => {
  const sizes = ["mini", "average", "adult", "jumbo"];

  const small = p.images[0].url;
  const large = p.images[0].url;

  let dispatch = useDispatch();
  const handleSizeChange = (e) => {
    console.log("size change", e.target.value);

    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].size = e.target.value;
        }
      });
      //   console.log('update size', cart)
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleQuantityChange = (e) => {
    //   console.log('availability', p.quantity )

    let count =
      e.target.value < 1
        ? 1 &
          toast.error(
            `Do you mean to remove product from cart? Tap the ❌ icon instead.`
          )
        : e.target.value;

    if (count > p.quantity) {
      toast.error(
        `You've reached the max limit of ${p.quantity}. Contact us for forward orders.`
      );
      return;
    }

    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].count = count;
        }
      });
      //   console.log('update count', cart)
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleRemove = () => {
    // console.log(p._id), "to remove";
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart.splice(i, 1);
        }
      });
      //   console.log('update count', cart)
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  return (
    <tbody>
      <tr>
        <td>
          <div
            className="d-inline-flex "
            style={{
              width: "100px",
              transform: "translateY(-10%)",
            }}
          >
            {p.images.length ? (
              <ModalImage small={small} large={large} />
            ) : (
              <ModalImage small={fish} large={fish} />
            )}
          </div>
          <div className="col d-inline-block ml-2 ant-card-meta-description w-50 align-v">
            <b>{p.title}</b>
            <hr className="ultralight-border w-100" />
            $&nbsp;{p.price.toFixed(2)} per kg
          </div>
        </td>
        <td className="text-center align-v">
          <select
            onChange={handleSizeChange}
            name="size"
            className="form-control"
          >
            {p.size ? (
              <option value={p.size}>{p.size}</option>
            ) : (
              <option>select</option>
            )}
            {sizes
              .filter((s) => s !== p.size)
              .map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
          </select>
        </td>
        <td className="text-center align-v remove-table-spacing">
          <input
            type="number"
            className="form-control text-black"
            value={p.count}
            onChange={handleQuantityChange}
          />
        </td>
        <td className="text-center align-v remove-table-spacing">
          {p.variant}
        </td>
        <td className="text-center align-v remove-table-spacing">
          {p.shipping === "Yes" ? (
            <CheckCircleOutlined className="text-success" />
          ) : (
            <CloseCircleOutlined className="text-danger" />
          )}
        </td>
        <td className="text-center align-v remove-table-spacing">
          <CloseOutlined
            onClick={handleRemove}
            className="text-danger pointer"
          />
        </td>
      </tr>
    </tbody>
  );
};

export default ProductCardInCheckout;
