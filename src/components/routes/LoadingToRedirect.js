import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(3);
  let history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    // redirect once count is 0
    count === 0 && history.push("/");
    //cleanup

    return () => clearInterval(interval);
  }, [count, history]);
  return (
    <div className="container-bright p-4 text-center">
      <p>redirecting you in {count} seconds...</p>
    </div>
  );
};

export default LoadingToRedirect;
