import React from "react";
import { Spin, Alert } from "antd";

const Loader = () => {
  return (
    <Spin tip="Loading...">
      <Alert
        message="Alert message title"
        description="Further details about the context of this alert."
        type="info"
        style={{
          width: "60px",
          height: "60px",
          margin: "auto",
          display: "block",
        }}
      />
    </Spin>
  );
};

export default Loader;
