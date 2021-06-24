import React, { useState } from "react";
import { Card, Tabs, Tooltip } from "antd";
import { useHistory } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import fish from "../../square-icon-sivanes.png";
import ProductInfoCard from "./ProductInfoCard";
import RatingModal from "../modal/RatingModal";
import StarRating from "react-star-ratings";
import showAverage from "../../functions/rating";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToWishlist } from "../../functions/user";

const { Meta } = Card;
const { TabPane } = Tabs;

// onStarClick is children component of Product.js

const SingleProduct = ({ product, onStarClick, star }) => {
  const [tooltip, setTooltip] = useState("tap to add");
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  let history = useHistory();
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
  const { title, images, slug, description, _id } = product;

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    addToWishlist(product._id, user.token).then((res) => {
      console.log("ADDED TO WISHLIST", res.data);
      toast.success("Added to wishlist!");
      history.push("/user/wishlist");
    });
  };

  return (
    <>
      <div className="col-md-8 ml-3 ">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images &&
              images.map((i) => (
                <img src={i.url} key={i.public_id} alt={i.slug} />
              ))}
          </Carousel>
        ) : (
          <Card cover={<img src={fish} alt="" className="mb-3 card-image" />}>
            <Meta title={title} />
          </Card>
        )}

        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="Contact Us" key="2">
            Call us @ xxx-xxx-xxx-xxx for product enquiry.
          </TabPane>
        </Tabs>
      </div>

      <div className="container-translucent">
        <Meta title={title}></Meta>
        {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className="text-center pt-1 pb-3">no ratings yet...</div>
        )}
        <hr />
        <Card
          bordered={false}
          actions={[
            <Tooltip title={tooltip}>
              <a onClick={handleAddToCart} disabled={product.quantity < 1}>
                <ShoppingCartOutlined className="text-danger" />
                <br />
                {product.quantity < 1 ? "out of stock" : "add to cart"}
              </a>
            </Tooltip>,
            <a onClick={handleAddToWishlist}>
              <HeartOutlined className="text-info" /> <br />
              add to wishlist
            </a>,
            <RatingModal>
              <StarRating
                name={_id}
                numberOfStars={5}
                changeRating={onStarClick}
                rating={star}
                starRatedColor="#082a69"
                starHoverColor="#031536"
                starDimension="20px"
                isSelectable={true}
              />
            </RatingModal>,
          ]}
        >
          <ProductInfoCard product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
