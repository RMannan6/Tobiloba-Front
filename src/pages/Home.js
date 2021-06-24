import React from "react";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/category/CategoryList";
import SubList from "../components/sub/SubList";
const newArrival = () => (
  <>
    <NewArrivals />
  </>
);

const bestSellers = () => (
  <>
    <BestSellers />
  </>
);

const Home = () => {
  return (
    <>
      <div
        style={{ paddingBottom: "100px" }}
        className="container-fluid dOSGuI col-mx-auto"
      >
        {/* <hr style={{ marginTop: "0px" }} /> */}
        <h5 className="pearl isomorph-i font-weight-bold">
          <span>🐟</span> NEW ARRIVALS
        </h5>
        {newArrival()}

        <br />
        <h5 className="volcano isomorph-i font-weight-bold">
          <span>🦀</span> BEST SELLERS
        </h5>
        {bestSellers()}
      </div>
      <div className="container-fluid pt-2 pb-5 d-block">
        <div className="d-inline-block container-translucent isomorph-i col-md-3  text-center mb-3">
          <h6 className="p-3">Category List</h6>
          <CategoryList />
        </div>
        <div className="d-inline-block container-translucent isomorph-i col-md-9 text-center mb-3">
          <h6 className="p-3">Tags</h6>
          <SubList />
        </div>
      </div>
    </>
  );
};

export default Home;
