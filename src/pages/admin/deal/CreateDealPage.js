import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createDeal, removeDeal, getDeals } from "../../../functions/deal.js";
import { button } from "antd";
import { Link } from "react-router-dom";
import { EditOutlined, SaveOutlined, DeleteOutlined } from "@ant-design/icons";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

const CreateDealPage = () => {
  const [name, setName] = useState("");
  const [discount, setDiscount] = useState("");
  const [expiry, setExpiry] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [deals, setDeals] = useState([]);

  // redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllDeals();
  }, []);

  const loadAllDeals = () => getDeals().then((res) => setDeals(res.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // console.table(name, expiry, discount);
    createDeal({ name, expiry, discount }, user.token)
      .then((res) => {
        setLoading(false);
        loadAllDeals(); // load all Deals
        setName("");
        setDiscount("");
        setExpiry("");
        toast.success(`"${res.data.name}" is created`);
      })
      .catch((err) => console.log("create coupon err", err));
  };

  const handleRemove = (dealId) => {
    if (window.confirm("Confirm delete?")) {
      setLoading(true);
      removeDeal(dealId, user.token)
        .then((res) => {
          loadAllDeals(); // load all Deals
          setLoading(false);
          toast.error(`Deal no "${res.data.name}" deleted`);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10 text-center container-bright">
          {loading ? (
            <h3 className="text-danger">loading...</h3>
          ) : (
            <h3> Create a deal</h3>
          )}

          <form
            className=" d-block w-75 text-center mx-auto thinner-border pr-3"
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <label>
                Name <i>(must be at least 6 alphanumeric characters)</i>
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                value={name}
                autoFocus
                required
              />
            </div>

            <div className="form-group">
              <label>Discount %</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setDiscount(e.target.value)}
                value={discount}
                required
              />
            </div>

            <div className="form-group">
              <label>Expiry</label>
              <br />
              <DatePicker
                className="form-control text-center"
                selected={expiry}
                onChange={(date) => setExpiry(date)}
                required
              />
            </div>

            <button
              ghost
              type="lightdark"
              className="mb-1 text-center col-md-1 isomorph-o icon-gold-3"
              block
              shape="round"
              icon={<SaveOutlined />}
              size="small"
            >
              SAVE
            </button>
          </form>
          <br />

          <h3>{deals.length} deals created so far...</h3>

          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th scope="col">Deal code</th>
                <th scope="col">Expiry</th>
                <th scope="col">Discount</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {deals.map((d) => (
                <tr key={d._id}>
                  <td>{d.name}</td>
                  <td>{new Date(d.expiry).toLocaleDateString()}</td>
                  <td>{d.discount}%</td>
                  <td>
                    <DeleteOutlined onClick={() => handleRemove(d._id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreateDealPage;
