import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav.js";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm.js";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload.js";
import { LoadingOutlined } from "@ant-design/icons";

const initialState = {
  title: "",
  description: "",
  details: "",
  price: "",
  category: "",
  categories: [],
  subs: [],
  shipping: "",
  quantity: "",
  images: [
    // {
    //   public_id: "rpqfapwk71bvng4xwwpx",
    //   url:
    //     "https://res.cloudinary.com/blason-tech/image/upload/v1614410587/rpqfapwk71bvng4xwwpx.jpg",
    // },
    // {
    //   public_id: "zsoekfxq4qlseidynhzl",
    //   url:
    //     "https://res.cloudinary.com/blason-tech/image/upload/v1614410000/zsoekfxq4qlseidynhzl.jpg",
    // },
    // {
    //   public_id: "xo01zhb4rg35lxab30ur",
    //   url:
    //     "https://res.cloudinary.com/blason-tech/image/upload/v1614410000/xo01zhb4rg35lxab30ur.jpg",
    // },
  ],
  sizes: ["mini", "average", "adult", "jumbo"],
  variants: [
    "salt water",
    "fresh water",
    "lean",
    "oily",
    "flat",
    "round",
    "anadromus",
    "catadromus",
    "shellfish",
  ],
  size: "",
  variant: "",
};

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setValues({ ...values, categories: c.data }));

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        window.alert(`"${res.data.title}" is created`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    setValues({ ...values, subs: [], category: e.target.value });
    getCategorySubs(e.target.value).then((res) => {
      setSubOptions(res.data);
    });
    setShowSub(true);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          {loading ? (
            <LoadingOutlined className="h1 col-2" />
          ) : (
            <h4>Create a product</h4>
          )}
          <hr />

          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>

          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleCategoryChange={handleCategoryChange}
            subOptions={subOptions}
            showSub={showSub}
            values={values}
            setValues={setValues}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
