import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome to Z Shop | home",
  description: "We curate & sell products that integrate with your lifestyle.",
  keywords:
    "yoga, meditation, camping, outdoors, study room, fishing, spirituality & mysticism, new-age philosophy.",
};
export default Meta;
