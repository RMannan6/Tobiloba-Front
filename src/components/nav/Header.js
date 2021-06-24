import React, { useState } from "react";
import { Menu, Badge } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UnlockOutlined,
  EditOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Search from "../forms/Search";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("");
  let dispatch = useDispatch();
  let { user, cart } = useSelector((state) => ({ ...state }));
  let history = useHistory();

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGGED_OUT_USER",
      payload: null,
    });
    history.push("/login");
  };
  return (
    <Menu
      style={{ position: "fixed", zIndex: 1, width: "100%" }}
      theme="dark"
      onClick={handleClick}
      selectedKeys={[current]}
      mode="horizontal"
    >
      <Item key="home" icon={<AppstoreOutlined color="#b6b6b6" />}>
        <Link to="/">home </Link>
      </Item>

      <Item key="shop" icon={<ShoppingOutlined color="#b6b6b6" />}>
        <Link to="/shop">shop </Link>
      </Item>

      <Item key="cart" icon={<ShoppingCartOutlined color="#b6b6b6" />}>
        <Link to="/cart">
          <Badge count={cart.length} offset={[-28, -6]} size="small">
            cart
          </Badge>
        </Link>
      </Item>

      {!user && (
        <Item
          key="register"
          icon={<EditOutlined color="#b6b6b6" />}
          className="float-right"
        >
          <Link to="/register">register</Link>
        </Item>
      )}
      {!user && (
        <Item
          key="login"
          icon={<UnlockOutlined color="#b6b6b6" />}
          className="float-right clearfix"
        >
          <Link to="/login">login</Link>
        </Item>
      )}

      {user && (
        <SubMenu
          key="SubMenu"
          icon={<SettingOutlined color="#b6b6b6" />}
          title={user.email && user.email.split("@")[0]}
          className="float-right clearfix"
        >
          {user && user.role === "subscriber" && (
            <Item>
              <Link to="/user/history">Dashboard</Link>
            </Item>
          )}

          {user && user.role === "admin" && (
            <Item>
              <Link to="/admin/dashboard">Dashboard</Link>
            </Item>
          )}

          <Item icon={<LogoutOutlined />} onClick={logout}>
            &nbsp; logout
          </Item>
        </SubMenu>
      )}

      <span className="float-right p-1">
        <Search />
      </span>
    </Menu>
  );
};

export default Header;
