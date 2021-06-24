import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSubs } from "../../functions/sub";
import { TagOutlined } from "@ant-design/icons";

import { Typography } from "antd";

const { Text } = Typography;

const SubList = () => {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSubs().then((c) => {
      setSubs(c.data);
      setLoading(false);
    });
  }, []);

  const showSubs = () =>
    subs.map((s) => (
      <Link
        style={{
          margin: "auto",
          textAlign: "middle",
        }}
        to={`/sub/${s.slug}`}
        className="label label-default label-pill pull-xs-right"
      >
        <Text code size="small" bordered={false}>
          {s.name}
          &nbsp;
          <TagOutlined style={{ marginRight: "-10px" }} />
        </Text>
      </Link>
    ));

  return (
    <div className="d-inline-block container-translucent text-center col-md-6">
      <div className="row">
        {loading ? <h4 className="text-center">loading...</h4> : showSubs()}
      </div>
    </div>
  );
};

export default SubList;
