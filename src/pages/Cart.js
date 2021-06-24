import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  LogoutOutlined,
  LoginOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { Tooltip, Button } from "antd";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import { userCart } from "../functions/user";
const Cart = ({ history }) => {
  const { cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };
  const saveOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };

  const saveCashOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    dispatch({
      type: "CASH_DELIVERY",
      payload: true,
    });
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };

  const showCartItems = () => (
    <table className="table table-bordered ">
      <thead className="thead-light ">
        <tr>
          <th scope="col">product</th>
          <th scope="col">size</th>
          <th scope="col">quantity</th>
          <th scope="col">variant</th>
          <th scope="col">shipping?</th>
          <th scope="col">remove product?</th>
        </tr>
      </thead>

      {cart.map((p) => (
        <ProductCardInCheckout key={p._id} p={p} />
      ))}
    </table>
  );
  return (
    <div
      className="container-translucent mr-2 "
      style={{ paddingBottom: "120px" }}
    >
      <div className="row">
        <div
          className="col-8 col-md-auto col col-md-8 mb-2 "
          style={{ marginBottom: "120px" }}
        >
          <h5 style={{ lineHeight: "0.2em" }}>Your cart... </h5>
          <hr />
          <h6 className="pb-2">has {cart.length} product(s):</h6>

          {!cart.length ? (
            <p className="descriptor-text">
              Your cart is empty!
              <Link to="/shop">&nbsp;shop now </Link>
            </p>
          ) : (
            showCartItems()
          )}
        </div>
        <div className="container-bright col-md-3 text-center mb-5">
          <h3 style={{ lineHeight: "0.2em" }}>Order summary </h3>
          <hr style={{ lineHeight: "0.2em" }} className="w-75" />
          <p>Here's what we've got in the basket...</p>
          <hr className="ultralight-border w-25" />
          {cart.map((c, i) => (
            <div key={i}>
              <p>
                {c.title} x {c.count} kg(s) @ ${(c.price * c.count).toFixed(2)}
              </p>
            </div>
          ))}
          <hr style={{ lineHeight: "0.2em" }} className="w-75" />
          <b>TOTAL: ${getTotal().toFixed(2)}</b>
          <hr className="w-50" />
          {user ? (
            <>
              <Tooltip placement="top" title="online checkout">
                <Button
                  onClick={saveOrderToDb}
                  ghost
                  type="lightdark"
                  className="d-inline-block mb-1 col-md-4 col-2 col-auto mr-auto isomorph-o icon-gold-3"
                  block
                  shape="round"
                  icon={<LogoutOutlined />}
                  size="small"
                  disabled={!cart.length}
                  alt="online checkout"
                >
                  <strong>online checkout</strong>
                </Button>
              </Tooltip>
              <Tooltip placement="top" title="pay cash on delivery">
                <Button
                  onClick={saveCashOrderToDb}
                  ghost
                  type="lightdark"
                  className="d-inline-block mb-1 col-md-4 col-2 ml-auto  col-auto isomorph-o icon-red-4"
                  block
                  shape="round"
                  icon={<DollarOutlined />}
                  size="small"
                  alt="pay cash on delivery"
                  disabled={!cart.length}
                >
                  <strong>pay cash on delivery</strong>
                </Button>
              </Tooltip>
            </>
          ) : (
            <>
              <p className="text-warning smaller-font">
                you have to login/signup to start purchase...
              </p>

              <Button
                ghost
                type="lightdark"
                className="col-6 col-auto col-md-auto mb-1 col-md-4 isomorph-o icon-blue-4"
                block
                shape="round"
                icon={<LoginOutlined />}
                size="small"
              >
                <Link to={{ pathname: "/login", state: { from: "cart" } }}>
                  <strong style={{ color: "#000" }}>login/signup</strong>
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Cart;
