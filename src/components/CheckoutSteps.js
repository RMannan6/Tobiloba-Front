import React from "react";
import { Steps } from "antd";
import {
  UserOutlined,
  SolutionOutlined,
  LoadingOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { LinkContainer } from "react-router-bootstrap";
const { Step } = Steps;

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Steps className="justify-content-center mb-4">
      <Step>
        {step1 ? (
          <LinkContainer to="/login">
            <Steps.Link> sign in </Steps.Link>
          </LinkContainer>
        ) : (
          <Steps.Link disabled> sign in </Steps.Link>
        )}
      </Step>

      <Step>
        {step2 ? (
          <LinkContainer to="/shipping">
            <Steps.Link> shipping</Steps.Link>
          </LinkContainer>
        ) : (
          <Steps.Link disabled> shipping </Steps.Link>
        )}
      </Step>

      <Step>
        {step3 ? (
          <LinkContainer to="/payment">
            <Steps.Link> payment </Steps.Link>
          </LinkContainer>
        ) : (
          <Steps.Link disabled> payment </Steps.Link>
        )}
      </Step>

      <Step>
        {step4 ? (
          <LinkContainer to="/placeorder">
            <Steps.Link> place order </Steps.Link>
          </LinkContainer>
        ) : (
          <Steps.Link disabled> place order </Steps.Link>
        )}
      </Step>
    </Steps>
  );
};

export default CheckoutSteps;
