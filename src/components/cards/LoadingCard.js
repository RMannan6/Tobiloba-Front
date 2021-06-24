import React from "react";
import { Card, Skeleton } from "antd";

const LoadingCard = ({ count }) => {
  const cards = () => {
    let totalCards = [];

    for (let i = 0; i < count; i++) {
      totalCards.push(
        <Card
          bordered={false}
          cover={
            <img
              style={{
                height: "200px",
                width: "100%",
                objectFit: "cover",
                marginTop: "20px",
              }}
              className="p-1"
              key={i}
            />
          }
          className="col-md-4"
        >
          <Skeleton active />
        </Card>
      );
    }
    return totalCards;
  };
  return <div className="row">{cards()}</div>;
};

export default LoadingCard;
