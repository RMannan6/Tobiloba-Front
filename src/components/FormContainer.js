import React from "react";
import { Layout, Row, Col } from "antd";

const FormContainer = ({ children }) => {
  return (
    <Layout>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Layout>
  );
};

export default FormContainer;
