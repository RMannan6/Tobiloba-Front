import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../functions/category";
import { TagOutlined } from "@ant-design/icons";

import { Typography } from "antd";

const { Text } = Typography;

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategories().then((c) => {
      setCategories(c.data);
      setLoading(false);
    });
  }, []);

  const showCategories = () =>
    categories.map((c) => (
      <Link
        style={{
          margin: "auto",
          textAlign: "middle",
        }}
        to={`/category/${c.slug}`}
        className="label label-default label-pill pull-xs-right"
      >
        <Text code size="small" bordered={false}>
          {c.name}
          &nbsp;
          <TagOutlined style={{ marginRight: "-10px" }} />
        </Text>
      </Link>
    ));

  return (
    <div className="d-inline-block container-translucent text-center col-md-6">
      <div className="row">
        {loading ? (
          <h4 className="text-center">loading...</h4>
        ) : (
          showCategories()
        )}
      </div>
    </div>
  );
};

export default CategoryList;
