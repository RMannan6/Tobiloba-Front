import React from "react";
import { Link } from "react-router-dom";

const AdminNav = () => {
  return (
    <nav>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/admin/dashboard" className="nav-link">
            Dashboard
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/admin/product" className="nav-link">
            Product
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/admin/products" className="nav-link">
            Product catalog
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/admin/category" className="nav-link">
            Category
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/admin/sub" className="nav-link">
            Tags
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/admin/deal" className="nav-link">
            Deals
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/admin/password" className="nav-link">
            Password
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNav;
