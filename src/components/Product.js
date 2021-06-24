import React, { useEffect, useState } from "react";
import { getProduct, productStar } from "../functions/product";
import SingleProduct from "../components/cards/SingleProduct";
import { useSelector } from "react-redux";
import { getRelated } from "../functions/product";
import { ShoppingOutlined } from "@ant-design/icons";
import ProductCard from "../components/cards/ProductCard";
import { Link } from "react-router-dom";

const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const [star, setStar] = useState(0);
  const [related, setRelated] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  const { slug } = match.params;

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  useEffect(() => {
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString() // either .toString() or change === to == because mongodb doesnt register ===
      );
      existingRatingObject && setStar(existingRatingObject.star); //current user's star
    }
  });

  const loadSingleProduct = () => {
    getProduct(slug).then((res) => {
      setProduct(res.data);
      //load related
      getRelated(res.data._id).then((res) => setRelated(res.data));
    });
  };

  const onStarClick = (newRating, name) => {
    setStar(newRating);
    // console.table("newRating", newRating);
    productStar(name, newRating, user.token).then((res) => {
      console.log("rating clicked", res.data);
      loadSingleProduct(); //real-time rating update
    });
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <SingleProduct
          product={product}
          onStarClick={onStarClick}
          star={star}
        />
      </div>

      <div className="row ">
        <div className="col text-center">
          <hr />
          <h5 className="pearl isomorph-o"> You may also like...</h5>
        </div>
      </div>

      <div style={{ paddingBottom: "80px" }} className="container-fluid">
        <h6>These {related.length} related products:</h6>
        <div className="row small-gutter">
          {related.length ? (
            related.map((r) => (
              <div
                className="d-flex flex-row mb-3 mt-3 col-md-4 col-xs-4"
                key={r._id}
              >
                <ProductCard product={r} />
              </div>
            ))
          ) : (
            <p>
              Back to &nbsp;
              <Link icon={<ShoppingOutlined color="#b6b6b6" />} to="/shop">
                shop?{" "}
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
