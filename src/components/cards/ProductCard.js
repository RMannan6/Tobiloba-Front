import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import { InboxOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import fish from "../../square-icon-sivanes.png";
import showAverage from "../../functions/rating";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const [tooltip, setTooltip] = useState("tap to add");
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    // create cart array
    let cart = [];
    if (typeof window !== "undefined") {
      // if cart is in localstorage GET it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // push new product to cart
      cart.push({
        ...product,
        count: 1,
      });
      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      //save to local storage
      // console.log('unique', unique)
      localStorage.setItem("cart", JSON.stringify(unique));
      //add tooltip
      setTooltip("add successful!");

      //add to redux state
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
      //show cart items in side drawer
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };
  const { title, description, images, price, slug } = product;
  return (
    <>
      <Card
        className="container-translucent justify-content-center align-self-center mx-auto col-auto col-mx-auto"
        style={{
          borderRadius: "20px",
          borderWidth: "thin",
          minHeight: "100%",
          marginTop: "20px",
          borderColor: "#d1d1d1",
          width: "50%",
          margin: "auto",
          marginBottom: "50px",
        }}
        cover={
          <>
            {" "}
            <Meta title={`${title}`} className="med-font isomorph-o " />
            <h6 className=" med-font text-center grass-text">
              <span className="gold-text">$ </span>&nbsp;{price.toFixed(2)}{" "}
              &nbsp; <span className="descriptor-text"> per kg</span>
            </h6>
            <>
              {product && product.ratings && product.ratings.length > 0 ? (
                showAverage(product)
              ) : (
                <div className="text-center pt-1 pb-3">no ratings yet..</div>
              )}
            </>
            <img
              src={images && images.length ? images[0].url : fish}
              style={{
                height: "100px",
                width: "80%",
                objectFit: "cover",
                marginTop: "40px",
                margin: "auto",
              }}
              className="p-1 mt-1"
            />
          </>
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <InboxOutlined className="text-success" /> <br /> view
          </Link>,
          <Tooltip title={tooltip}>
            <a onClick={handleAddToCart} disabled={product.quantity < 1}>
              <ShoppingCartOutlined className="text-danger" /> <br />{" "}
              {product.quantity < 1 ? "out of stock" : "add to cart"}
            </a>
          </Tooltip>,
        ]}
      >
        <Card.Meta
          description={`${description && description.substring(0, 70)}...`}
          price={`${price}`}
        />
      </Card>
    </>
  );
};

export default ProductCard;
