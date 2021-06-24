import React from "react";
import { TagsOutlined, TagOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Typography, Space } from "antd";

const { Text } = Typography;

const ProductInfoCard = ({ product }) => {
  const {
    price,
    category,
    subs,
    shipping,
    variant,
    size,
    quantity,
    sold,
  } = product;
  return (
    <ul className="list-group">
      <li className="list-group-item">
        Price:{" "}
        <span className="label label-default label-pill pull-xs-right">
          $ {price}
        </span>
      </li>

      {category && (
        <li className="list-group-item">
          Category:{" "}
          <Link
            to={`/category/${category.slug}`}
            className="label label-default label-pill pull-xs-right"
          >
            <Text code size="small" bordered={false}>
              {category.name}
              &nbsp;
              <TagOutlined style={{ marginRight: "-30px" }} />
            </Text>
          </Link>
        </li>
      )}

      {subs && (
        <li className="list-group-item">
          Tags: &nbsp;
          {subs.map((s) => (
            <Link
              key={s._id}
              to={`/sub/${s.slug}`}
              className="label label-default label-pill pull-xs-right"
            >
              <Text code size="small" bordered={false}>
                {s.name}
                &nbsp;
                <TagsOutlined style={{ marginRight: "-30px" }} />
              </Text>
            </Link>
          ))}
        </li>
      )}

      <li className="list-group-item">
        Shipping:{" "}
        <span className="label label-default label-pill pull-xs-right">
          {shipping}
        </span>
      </li>
      <li className="list-group-item">
        Size:{" "}
        <span className="label label-default label-pill pull-xs-right">
          {size}
        </span>
      </li>
      <li className="list-group-item">
        Variant:{" "}
        <span className="label label-default label-pill pull-xs-right">
          {variant}
        </span>
      </li>
      <li className="list-group-item">
        In Stock:{" "}
        <span className="label label-default label-pill pull-xs-right">
          {quantity}
        </span>
      </li>
      <li className="list-group-item">
        Sold:{" "}
        <span className="label label-default label-pill pull-xs-right">
          {sold}
        </span>
      </li>
    </ul>
  );
};

export default ProductInfoCard;
