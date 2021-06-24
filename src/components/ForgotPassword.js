import React, { useState, useEffect } from "react";
import { auth } from "../firebase.js";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
      handleCodeInApp: true,
    };
    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {})
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };
  return (
    <div className="container col-md-6 offset-md-3 p-5">
      {loading ? (
        <h4 className="text-warning">loading...</h4>
      ) : (
        <>
          {" "}
          <strong>reset</strong>
          <i>password</i>
        </>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control form-control-sm my-1 shadow-3 p-1"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="...by entering your email here."
          size="sm"
          autoFocus
        />
        <br />
        <button
          className="btn btn-secondary btn-sm btn-light my-2"
          disabled={!email}
        >
          submit
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
