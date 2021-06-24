import React from "react";
import { Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import fish from "../../square-icon-sivanes.png";
const { Meta } = Card;

const AdminProductCard = ({ product, handleRemove }) => {
  const { title, description, images, price, slug } = product;
  return (
    <div className="container-bright">
      <Meta title={title} />
      <Card
        bordered={false}
        cover={
          <img
            src={images && images.length ? images[0].url : fish}
            style={{
              height: "250px",
              width: "100%",
              objectFit: "cover",
              marginTop: "50px",
            }}
            className="p-1"
          />
        }
        actions={[
          <Link to={`/admin/product/${slug}`}>
            <EditOutlined key="edit" className="text-success" />
          </Link>,
          <DeleteOutlined
            onClick={() => handleRemove(slug)}
            key="delete"
            className="text-danger"
          />,
        ]}
      >
        <Meta
          description={`${description && description.substring(0, 120)}...`}
          price={`${price}`}
        />
      </Card>
    </div>
  );
};

export default AdminProductCard;
