import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  applyDeal,
  createCashOrderForUser,
} from "../functions/user";
import { toast } from "react-toastify";
import { Button, Tooltip } from "antd";
import {
  SaveOutlined,
  RollbackOutlined,
  LogoutOutlined,
  PayCircleOutlined,
} from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Checkout = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [tooltip, setTooltip] = useState(
    "please ensure you've provided delivery address / your cart isn't empty."
  );
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [deal, setDeal] = useState("");

  //store discount price from controller
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");

  const dispatch = useDispatch();
  const { user, cash } = useSelector((state) => ({ ...state }));
  const dealTrueOrFalse = useSelector((state) => state.deal);

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      console.log("user cart res", JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);

  const emptyCart = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    //remove from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    //remove from backend
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      setTotalAfterDiscount(0);
      setDeal("");
      toast.warning("cart is empty...back to shopping?");
    });
  };

  const saveAddressToDb = () => {
    saveUserAddress(user.token, address)
      .then((res) => {
        if (res.data.ok) {
          setAddressSaved(true).then(toast.success("address saved!"));
        }
      })
      .catch((err) => toast.success("address saved!", err));
  };

  const applyDiscountDeal = () => {
    console.log("send deal to backend", deal);
    applyDeal(user.token, deal).then((res) => {
      console.log("RES ON DEAL APPLIED", res.data);
      if (res.data) {
        setTotalAfterDiscount(res.data);
        // push the totalAfterDiscount to redux true/false
        dispatch({
          type: "DEAL_APPLIED",
          payload: true,
        });
      }
      if (res.data.err) {
        setDiscountError(res.data.err);
        //update  redux deal applied
        dispatch({
          type: "DEAL_APPLIED",
          payload: false,
        });
      }
    });
  };
  const showAddress = () => (
    <>
      <ReactQuill
        placeholder="e.g. Street 739, Essex Court Brattleboro, VT 05301 | HP: 802-314-1367 | Deliver@noon."
        theme="snow"
        value={address}
        onChange={setAddress}
        style={{ height: "20vh", width: "auto", marginBottom: "100px" }}
      />
      <br />

      <button
        onClick={() => saveAddressToDb(address)}
        type="lightdark"
        className="col-md-auto col-auto ml-md-auto ml-auto text-center mb-1 isomorph-o icon-gray-9"
        shape="round"
        size="small"
      >
        save/edit info
      </button>
    </>
  );
  const showProductSummary = () => (
    <>
      {products.map((p, i) => (
        <div style={{ lineHeight: "5px" }} key={i}>
          <b className="thick-and-fat">
            {p.product.title} ({p.size}) x {p.count}{" "}
          </b>
          <hr
            style={{ lineHeight: "2px" }}
            className="ultralight-border w-25"
          />

          <>
            <p>$&nbsp;{(p.product.price * p.count).toFixed(2)}</p>{" "}
            <span style={{ lineHeight: "20px", fontSize: "8px" }}>◉</span>
          </>
        </div>
      ))}
      <hr className="thinner-border w-75" />
      <p>Total: $&nbsp; {total.toFixed(2)}</p>

      {totalAfterDiscount > 0 && (
        <p className="bg-success p-2 m-1">
          discount success! New Payable $&nbsp;{totalAfterDiscount}
        </p>
      )}
    </>
  );

  const showApplyDeal = () => (
    <>
      <input
        placeholder="key in promo code here..."
        onChange={(e) => {
          setDeal(e.target.value);
          setDiscountError("");
        }}
        value={deal}
        type="text"
        className="form-control col text-center"
      />
      <button
        onClick={applyDiscountDeal}
        type="lightdark"
        className="text-center mb-1 col-md-auto col-auto ml-auto isomorph-o icon-gray-9"
        shape="round"
        size="small"
      >
        apply
      </button>
    </>
  );

  const createCashOrder = () => {
    //
    createCashOrderForUser(user.token, cash, dealTrueOrFalse).then((res) => {
      console.log("USER CASH ORDER CREATED RES", res);
      // empty cart from redux, localStorage, reset deal, reset cash, redirect
      if (res.data.ok) {
        //empty local storage
        if (typeof window !== "undefined") localStorage.removeItem("cart");

        //empty redux cart
        dispatch({
          type: "ADD_TO_CART",
          payload: [],
        });
        //empty redux deal
        dispatch({
          type: "DEAL_APPLIED",
          payload: false,
        });
        //empty redux cash
        dispatch({
          type: "CASH_DELIVERY",
          payload: false,
        });
        //empty cart from backend
        emptyUserCart(user.token);
        //redirect
        setTimeout(() => {
          history.push("/user/history");
        }, 1000);
      }
    });
  };
  return (
    <div className="row justify-content-md-center pt-4 mb-5">
      <div className="col-md-6 ml-2 col-7 mx-auto">
        <h1>Shipping Address</h1>
        <p>Please provide your address for delivery </p>
        <i className="smaller-font">
          Do add relevant info (e.g. complex/building, landmark, phone number,
          delivery time of day, etc.)
        </i>
        {showAddress()}
        <hr className="ultralight-border" />
        <h4>got promo code?</h4>
        <br />
        {showApplyDeal()}
        <br />
        {discountError && <p className="bg-danger p-2 m-1">{discountError}</p>}
      </div>
      <div className="container-bright col-md-3 col-8 col-auto col-md-auto text-center">
        <h4>Order summary</h4>
        <hr className="thinner-border w-25" />
        <h1 style={{ lineHeight: "20px" }}> $ &nbsp; {total.toFixed(2)}</h1>
        <hr style={{ lineHeight: "2px" }} className=" w-50 ultralight-border" />
        <b>from {products.length} items, with details listed below:</b>
        <hr style={{ lineHeight: "2px" }} className="ultralight-border" />

        {showProductSummary()}

        <div className="d-inline-flex text-sm-center  justify-content-end col-md-6 col-8">
          <div className="row ">
            {cash ? (
              <Tooltip
                title={`please specify cash on delivery details @ 'address' box, if any`}
              >
                <Button
                  ghost
                  type="lightdark"
                  block
                  shape="round"
                  icon={<PayCircleOutlined />}
                  size="small"
                  disabled={!addressSaved || !products.length}
                  onClick={createCashOrder}
                  className="col icon-gold-3 col-auto col-md-auto-isomorph-o"
                >
                  place order
                </Button>
              </Tooltip>
            ) : (
              <Tooltip title={tooltip}>
                <Button
                  ghost
                  type="lightdark"
                  block
                  shape="round"
                  icon={<LogoutOutlined />}
                  size="small"
                  disabled={!addressSaved || !products.length}
                  onClick={() => history.push("/payment")}
                  className="col icon-gold-3 col-auto col-md-auto-isomorph-o"
                >
                  place order
                </Button>
              </Tooltip>
            )}
          </div>
          <div className="col-md-6 col-7">
            <Button
              onClick={emptyCart}
              ghost
              type="lightdark"
              className="mb-1 col-md-auto  col-auto isomorph-o icon-blue-4"
              block
              shape="round"
              icon={<RollbackOutlined />}
              size="small"
              disabled={!products.length}
            >
              start over
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
