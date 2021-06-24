import React, { useState, useEffect } from "react";
import {
  getProductsByCount,
  fetchProductsByFilter,
} from "../functions/product";
import { getCategories } from "../functions/category";
import { getSubs } from "../functions/sub";

import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import { Menu, Slider, Radio, Checkbox, Typography, Button } from "antd";
import {
  DollarOutlined,
  TagsOutlined,
  TagOutlined,
  StarOutlined,
  ExpandAltOutlined,
  SelectOutlined,
  DownSquareOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import Star from "../components/forms/Star";

const { Text } = Typography;

const { SubMenu } = Menu;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [collapsed, toggleCollapse] = useState(true);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [star, setStar] = useState("");
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState("");
  const [sizes, setSizes] = useState(["mini", "average", "adult", "jumbo"]);

  const [variants, setVariants] = useState([
    "salt water",
    "fresh water",
    "lean",
    "oily",
    "flat",
    "round",
    "anadromus",
    "catadromus",
    "shellfish",
  ]);
  const [size, setSize] = useState("");
  const [variant, setVariant] = useState("");
  const [shipping, setShipping] = useState("");
  const [shippings, setShippings] = useState(["Yes", "No"]);

  let dispatch = useDispatch();

  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    getCategories().then((res) => setCategories(res.data));

    getSubs().then((res) => setSubs(res.data));
    loadAllProducts();
  }, []);

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  // 1. load products by default on page load
  const loadAllProducts = () => {
    getProductsByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  // 2. load products on user search input
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
      if (!text) {
        loadAllProducts();
      }
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  // 3. load products based on price range
  useEffect(() => {
    console.log("ok to request");
    fetchProducts({ price });
  }, [ok]);

  const handleSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });

    // reset
    setCategoryIds([]);
    setPrice(value);
    setStar("");
    setSub("");
    setSize("");
    setVariant("");
    setShipping("");
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };
  //4list products based on categories in checkboxes
  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          onChange={handleCheck}
          style={{ color: "#b6b6b6" }}
          className="pb-2 pl-4 pr-4 p-2"
          value={c._id}
          name="category"
          checked={categoryIds.includes(c._id)}
        >
          {c.name}
        </Checkbox>
      </div>
    ));

  // handle check for categories
  const handleCheck = (e) => {
    // reset
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setStar("");
    setSub("");
    setSize("");
    setVariant("");
    setShipping("");

    // console.log(e.target.value);
    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked); // index or -1

    // indexOf method ?? if not found returns -1 else return index [1,2,3,4,5]
    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      // if found pull out one item from index
      inTheState.splice(foundInTheState, 1);
    }

    setCategoryIds(inTheState);
    // console.log(inTheState);
    fetchProducts({ category: inTheState });
  };

  // 5. show products by star rating
  const handleStarClick = (num) => {
    // console.log(num);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar(num);
    setSub("");
    setSize("");
    setVariant("");
    setShipping("");

    fetchProducts({ stars: num });
  };
  const showStars = () => (
    <div className="row pr-4 pl-4 pb-2 ml-1 mt-1">
      <Star
        rating={1}
        name="rating"
        starClick={handleStarClick}
        numberOfStars={1}
      />{" "}
      &nbsp;
      <Star
        rating={2}
        name="rating"
        starClick={handleStarClick}
        numberOfStars={1}
      />{" "}
      &nbsp;
      <Star
        rating={3}
        name="rating"
        starClick={handleStarClick}
        numberOfStars={1}
      />{" "}
      &nbsp;
      <Star
        rating={4}
        name="rating"
        starClick={handleStarClick}
        numberOfStars={1}
      />{" "}
      &nbsp;
      <Star
        rating={5}
        name="rating"
        starClick={handleStarClick}
        numberOfStars={1}
      />
    </div>
  );

  //6 show tags by sub categories

  const showSubs = () =>
    subs.map((s) => (
      <div
        key={s._id}
        className="d-inline-block p-1 m-1 mt-2 mb-3 "
        style={{ cursor: "pointer" }}
        onClick={() => handleSub(s)}
      >
        <Text code size="small" bordered={false}>
          {s.name}
          &nbsp;
        </Text>
      </div>
    ));

  const handleSub = (sub) => {
    // console.log("SUB", sub);
    setSub(sub);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setCategoryIds([]);
    setPrice([0, 0]);
    setStar("");
    setSize("");
    setVariant("");
    setShipping("");

    fetchProducts({ sub });
  };

  //7 show size

  const showSizes = () =>
    sizes.map((z) => (
      <Radio
        key={z}
        name={z}
        style={{ color: "#b6b6b6" }}
        className="col-md-4  pb-1 pl-1 pr-4 mt-2 ml-3"
        value={z}
        checked={z === size}
        onChange={handleSize}
      >
        {z}
      </Radio>
    ));

  const handleSize = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setCategoryIds([]);
    setPrice([0, 0]);
    setStar("");
    setVariant("");
    setShipping("");

    setSize(e.target.value);
    fetchProducts({ size: e.target.value });
  };

  const showVariants = () =>
    variants.map((v) => (
      <Radio
        key={v}
        name={v}
        style={{ color: "#b6b6b6" }}
        className="d-inline-block mt-2 ml-2"
        value={v}
        checked={v === variant}
        onChange={handleVariant}
      >
        {v}
      </Radio>
    ));

  const handleVariant = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setCategoryIds([]);
    setPrice([0, 0]);
    setStar("");
    setSize("");
    setShipping("");

    setVariant(e.target.value);
    fetchProducts({ variant: e.target.value });
  };

  //shipping
  const showShipping = () =>
    shippings.map((s) => (
      <Radio
        name={s}
        style={{ color: "#b6b6b6" }}
        className="col-md-4 pb-1 pl-1 pr-4 mt-2 ml-3"
        value={s}
        checked={s === shipping}
        onChange={handleShippingchange}
      >
        {s}
      </Radio>
    ));

  const handleShippingchange = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setCategoryIds([]);
    setPrice([0, 0]);
    setStar("");
    setSize("");
    setVariant("");
    setShipping(e.target.value);
    fetchProducts({ shipping: e.target.value });
  };

  // handle sidemenu collapse
  const handleCollapse = (e) => {
    toggleCollapse(e.key);
    if (!collapsed) {
      toggleCollapse(true);
    } else {
      toggleCollapse(false);
    }
  };

  return (
    <div
      className="container-fluid col-mx-auto  pb-5"
      style={{ marginBottom: "100px" }}
    >
      <div className="row">
        <div className="col-md-1 col-1 fixed">
          Search/Filter
          <div style={{ width: 256 }}>
            {collapsed ? (
              <>
                <Button
                  type="dark"
                  className="ant-menu"
                  onClick={handleCollapse}
                  style={{ marginBottom: 16 }}
                  icon={<MenuUnfoldOutlined style={{ color: "white" }} />}
                ></Button>
                <div className="col" style={{ marginTop: 10, marginLeft: -10 }}>
                  <Menu
                    style={{ width: 60, borderRadius: "10px" }}
                    defaultOpenKeys={[]}
                    mode="vertical"
                    inlineCollapsed={collapsed}
                  >
                    <SubMenu
                      style={{ color: "#b6b6b6" }}
                      key="1"
                      icon={<DollarOutlined />}
                    >
                      <div>
                        <Slider
                          className="ml-4 mr-4"
                          tipFormatter={(v) => `$${v}`}
                          range
                          value={price}
                          onChange={handleSlider}
                          max="4999"
                        ></Slider>
                      </div>
                    </SubMenu>

                    {/* category */}

                    <SubMenu
                      style={{ color: "#b6b6b6" }}
                      key="2"
                      icon={<TagOutlined />}
                    >
                      <div>{showCategories()}</div>
                    </SubMenu>

                    {/* stars */}

                    <SubMenu
                      style={{ color: "#b6b6b6" }}
                      key="3"
                      icon={<StarOutlined />}
                    >
                      <div>{showStars()}</div>
                    </SubMenu>

                    {/* Tags */}

                    <SubMenu
                      className="col"
                      style={{ color: "#b6b6b6" }}
                      key="4"
                      icon={<TagsOutlined />}
                    >
                      {showSubs()}
                    </SubMenu>

                    {/* Sizes */}

                    <SubMenu
                      style={{ color: "#b6b6b6" }}
                      key="5"
                      icon={<ExpandAltOutlined />}
                    >
                      <div style={{ marginTop: "-10px" }}>{showSizes()}</div>
                    </SubMenu>

                    {/* Variants */}

                    <SubMenu
                      style={{ color: "#b6b6b6" }}
                      key="6"
                      icon={<SelectOutlined />}
                    >
                      <div xs={2} md={3} style={{ marginTop: "-10px" }}>
                        {showVariants()}
                      </div>
                    </SubMenu>

                    {/* Shipping */}

                    <SubMenu
                      style={{ color: "#b6b6b6" }}
                      key="7"
                      icon={<DownSquareOutlined />}
                    >
                      <div style={{ marginTop: "-10px" }}>{showShipping()}</div>
                    </SubMenu>
                  </Menu>
                </div>
              </>
            ) : (
              <>
                <Button
                  className="ant-menu"
                  onClick={handleCollapse}
                  style={{ marginBottom: 16 }}
                  icon={<MenuFoldOutlined style={{ color: "white" }} />}
                ></Button>

                <div
                  className="col"
                  style={{
                    width: 240,
                    marginTop: 10,
                    marginLeft: -10,
                  }}
                >
                  <Menu
                    style={{ borderRadius: "10px" }}
                    defaultOpenKeys={[]}
                    mode="inline"
                    // inlineCollapsed={collapsed}
                  >
                    <SubMenu
                      style={{ color: "#b6b6b6" }}
                      key="1"
                      icon={<DollarOutlined />}
                      title={<span>Price (range)</span>}
                    >
                      <div>
                        <Slider
                          className="ml-4 mr-4"
                          tipFormatter={(v) => `$${v}`}
                          range
                          value={price}
                          onChange={handleSlider}
                          max="4999"
                        ></Slider>
                      </div>
                    </SubMenu>

                    {/* category */}

                    <SubMenu
                      style={{ color: "#b6b6b6" }}
                      key="2"
                      icon={<TagOutlined />}
                      title={<span>Categories</span>}
                    >
                      <div style={{ marginTop: "-10px" }}>
                        {showCategories()}
                      </div>
                    </SubMenu>

                    {/* stars */}

                    <SubMenu
                      style={{ color: "#b6b6b6" }}
                      key="3"
                      icon={<StarOutlined />}
                      title={<span>Rating</span>}
                    >
                      <div style={{ marginTop: "-10px" }}>{showStars()}</div>
                    </SubMenu>

                    {/* Tags */}

                    <SubMenu
                      className="col"
                      style={{ color: "#b6b6b6" }}
                      key="4"
                      icon={<TagsOutlined />}
                      title={<span>Tags</span>}
                    >
                      {showSubs()}
                    </SubMenu>

                    {/* Sizes */}

                    <SubMenu
                      style={{ color: "#b6b6b6" }}
                      key="5"
                      icon={<ExpandAltOutlined />}
                      title={<span>Size</span>}
                    >
                      <div style={{ marginTop: "-10px" }}>{showSizes()}</div>
                    </SubMenu>

                    {/* Variants */}

                    <SubMenu
                      style={{
                        color: "#b6b6b6",
                      }}
                      key="6"
                      icon={<SelectOutlined />}
                      title={<span>Variant</span>}
                    >
                      <div>{showVariants()}</div>
                    </SubMenu>

                    {/* Shipping */}

                    <SubMenu
                      style={{ color: "#b6b6b6" }}
                      key="7"
                      icon={<DownSquareOutlined />}
                      title={<span>Shipping</span>}
                    >
                      <div style={{ marginTop: "-10px" }}>{showShipping()}</div>
                    </SubMenu>
                  </Menu>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="col-md-10 col-8 offset-2 col-mx-auto ml-auto">
          <h4 style={{ lineHeight: "0.5em" }}>We've found: </h4>
          <hr />
          {loading ? (
            <h4 className="text-danger">loading...</h4>
          ) : (
            <div className="row small-gutter">
              &nbsp; <h6>{products.length} product(s) for you...</h6>
            </div>
          )}
          {products.length < 1 && (
            <p className="descriptor-text">
              We're sorry about the experience, do search other products,
              meantime.{" "}
            </p>
          )}
          <div className="row small-gutter justify-content-center">
            {products.map((p) => (
              <div className="col-mx-auto col-sm-4 text-center mt-3  pb-5 d-flex align-items-stretch">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
