import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Register = ({ history }) => {
  const [email, setEmail] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `We've just sent an email to ${email}. Follow its instructions to proceed to the next step.`
    );

    window.localStorage.setItem("emailFromRegistration", email);
    /// clear state
    setEmail("");
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control form-control-sm my-1 shadow-3 p-1"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="enter your email..."
        autoFocus
      />

      <button type="submit" className="btn btn-secondary btn-sm btn-light my-2">
        register / <strong>{email}</strong>
      </button>
    </form>
  );
  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-3 offset-md-2">
          <strong>register</strong>
          <i>begin</i>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
