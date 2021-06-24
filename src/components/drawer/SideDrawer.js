import React, { useState } from "react";
import { Drawer, Button } from "antd";
import { InboxOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import fish from "../../images/depositphotos_388319796-stock-photo-chub-mackerel-pacific-mackerel-saba.jpg";
import { useSelector, useDispatch } from "react-redux";

const SideDrawer = ({ children }) => {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector((state) => ({ ...state }));

  const imageStyle = {
    width: "150px",
    height: "100%",
    transform: "scale(0.6)",
    objectFit: "cover",
    marginBottom: "-10px",
  };
  return (
    <Drawer
      className="text-center drawer-mask "
      title={`your 🛒 ⇀ ${cart.length} item(s).`}
      placement="right"
      closable={false}
      onClose={() => {
        //show cart items in side drawer
        dispatch({
          type: "SET_VISIBLE",
          payload: false,
        });
      }}
      visible={drawer}
    >
      {cart.map((p) => (
        <div key={p._id} className="row">
          <div className="col  d-flex">
            {p.images[0] ? (
              <>
                <img src={p.images[0].url} style={imageStyle} />
                <p className="text-center text-light align-self-center">
                  {p.title} <br />x {p.count}
                </p>
              </>
            ) : (
              <>
                <img src={fish} style={imageStyle} />
                <p className="text-center text-light align-self-center">
                  {p.title} <br />x {p.count}
                </p>
              </>
            )}
          </div>
        </div>
      ))}
      <Link to="/cart" className="text-center btn btn-block mt-4">
        <strong>ready to checkout? &nbsp;</strong>
        <Button
          onClick={() =>
            dispatch({
              type: "SET_VISIBLE",
              payload: false,
            })
          }
          ghost
          type="lightdark"
          className="mb-1 col-md-3 isomorph-o icon-gold-3"
          block
          shape="round"
          icon={<ShoppingCartOutlined />}
          size="small"
        ></Button>
      </Link>
    </Drawer>
  );
};

export default SideDrawer;
