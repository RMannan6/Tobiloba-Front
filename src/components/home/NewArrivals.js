import React, { useEffect, useState } from "react";
import { getProducts, getProductsCount } from "../../functions/product";
import ProductCard from "../cards/ProductCard";
import LoadingCard from "../cards/LoadingCard";
// import { Pagination } from "antd";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadAllProducts();
  }, [page]);

  useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res.data));
  }, [setPage]);

  const loadAllProducts = () => {
    setLoading(true);

    // sort, order, limit
    getProducts("createdAt", "desc", page).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };
  return (
    <>
      <div
        style={{ paddingBottom: "100px" }}
        className="container-fluid d-inline-block"
      >
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          <div className="row small-gutter">
            {products.map((product) => (
              <div
                key={product._id}
                className="col-md-3 d-flex align-content-stretch flex-row"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* <div className="row">
        <nav className="col-md-4 offset-md-4 text-center pt-2 p-3">
          <Pagination
            current={page}
            total={(productsCount / 3) * setPage}
            onChange={(value) => setPage(value)}
          />
        </nav>
      </div> */}
    </>
  );
};

export default NewArrivals;
