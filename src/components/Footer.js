import React, { useState } from "react";
import { Drawer, Space, Button } from "antd";
import visa from "../icons/MainVisaBlue.png";
import mtc from "../icons/mc_vrt_opt_rev_73_1x.png";
import dsc from "../icons/discover_logo.jpg";
import amex from "../icons/Amex_logo_color.png";
import logo from "../square-icon-sivanes-small.png";
import "../footer-style.css";

const Footer = () => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const iconStyle = {
    position: "absolute",
    left: "calc(100vw - 440px)",
    bottom: "215px",
    width: "48px",
    height: "48px",
    // transform: "scale(0.6)",
    objectFit: "cover",
    marginBottom: "-10px",
  };

  return (
    <>
      <Button
        style={{
          background: "#001529",
          color: "rgba(255, 255, 255, 0.65)",
          borderColor: "rgba(255, 255, 255, 0.65)",
          position: "fixed",
          paddingBottom: "40px",
          bottom: "0",
        }}
        type="primary"
        onClick={showDrawer}
        className="btn btn-sm btn-block btn-outline-primary isomorph-i d-inline-block small-text"
      >
        Copyright &copy; SIVANES WHOLESALE SEAFOOD {new Date().getFullYear()}{" "}
        <ul className="d-inline-flex float-right clearfix">
          We accept:
          <li className="d-inline-block mr-2">
            <img
              className="rounded-sm block shadow"
              src={visa}
              alt="Visa"
              width="auto"
              height="18em"
            />
          </li>
          <li className="d-inline-block mr-2">
            <img
              className="rounded-sm block shadow"
              src={dsc}
              alt="Discover"
              width="auto"
              height="18em"
            />
          </li>
          <li className="d-inline-block mr-2">
            <img
              className="rounded-sm block shadow"
              src={amex}
              alt="American Express"
              width="auto"
              height="18em"
            />
          </li>
          <li className="d-inline-block mr-2">
            <img
              className="rounded-sm block shadow"
              src={mtc}
              alt="MasterCard"
              width="auto"
              height="18em"
            />
          </li>
        </ul>
      </Button>

      <Drawer
        className="text-center "
        title={`🐟 The APAC Wholesale Seafood Marketplace`}
        placement="bottom"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <ul className="fa-ul sitemap ">
          <h6 className="gold">About Us</h6>
          <li className="site-item">
            <span className="fa-li">
              <i className="fas fa-fish"></i>
            </span>
            Blog
          </li>
          <li className="site-item">
            <span className="fa-li">
              <i className="fas fa-fish "></i>
            </span>
            Affiliates
          </li>
          <li className="site-item">
            <span className="fa-li">
              <i className="fas fa-fish "></i>
            </span>
            Partners
          </li>
        </ul>
        <ul className="fa-ul sitemap ">
          <h6 className="gold">Assistance</h6>
          <li className="site-item">
            <span className="fa-li">
              <i className="fas fa-fish "></i>
            </span>
            Contact Us
          </li>
          <li className="site-item">
            <span className="fa-li">
              <i className="fas fa-fish "></i>
            </span>
            Customer Service
          </li>
          <li className="site-item">
            <span className="fa-li">
              <i className="fas fa-fish "></i>
            </span>
            Request a Quote
          </li>
          <li className="site-item">
            <span className="fa-li">
              <i className="fas fa-fish "></i>
            </span>
            Partners
          </li>
          <li className="site-item">
            <span className="fa-li">
              <i className="fas fa-fish "></i>
            </span>
            Your Account
          </li>
          <li className="site-item">
            <span className="fa-li">
              <i className="fas fa-fish "></i>
            </span>
            Your Orders
          </li>
        </ul>

        <ul className="fa-ul sitemap ">
          <h6 className="gold">Your Rights</h6>
          <li className="site-item">
            <span className="fa-li">
              <i className="fas fa-fish "></i>
            </span>
            Privacy Policy
          </li>
          <li className="site-item">
            <span className="fa-li">
              <i className="fas fa-fish "></i>
            </span>
            Data Policy
          </li>
          <li className="site-item">
            <span className="fa-li">
              <i className="fas fa-fish "></i>
            </span>
            Shipping Rates
          </li>
          <li className="site-item">
            <span className="fa-li">
              <i className="fas fa-fish "></i>
            </span>
            Return Policy
          </li>
        </ul>

        <ul className="fa-ul sitemap ">
          <h6 className="gold">Follow Us On</h6>

          <li className="site-item">
            <span className="fa-li">
              <i style={{ color: "cyan" }} className="fab fa-twitter "></i>
            </span>
            Twitter
          </li>
          <li className="site-item">
            <span className="fa-li">
              <i className="fab fa-facebook-f "></i>
            </span>
            Facebook
          </li>
          <li className="site-item">
            <span className="fa-li">
              <i style={{ color: "red" }} className="fab fa-pinterest "></i>
            </span>
            Pinterest
          </li>
          <li className="site-item">
            <span className="fa-li">
              <i style={{ color: "red" }} className="fab fa-youtube "></i>
            </span>
            YouTube
          </li>
        </ul>

        <img className="d-inline-block" src={logo} style={iconStyle} />
      </Drawer>
    </>
  );
};

export default Footer;
