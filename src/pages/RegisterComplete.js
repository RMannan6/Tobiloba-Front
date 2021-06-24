import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createOrUpdateUser } from "../functions/auth";

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const { user } = useSelector((state) => ({ ...state }));
  let dispatch = useDispatch();

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailFromRegistration"));
  }, [history]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation
    if (!email || !password) {
      toast.error("email & password required.");
    }
    if (password.length < 6) {
      toast.error("password must be at least 6 characters.");

      return;
    }
    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      if (result.user.emailVerified) {
        // remove user email from local storage
        window.localStorage.removeItem("emailFromRegistration");
        //get user token
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        //redux store
        console.log("user", user, "idTokenResult", idTokenResult);

        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));

        /// redirect
        history.push("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const completeRegistrationForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control form-control-sm my-1 shadow-3 p-1"
        value={email}
        disabled
      />

      <input
        placeholder="set password..."
        type="password"
        className="form-control form-control-sm my-1 shadow-3 p-1"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
      />
      <button type="submit" className="btn btn-secondary btn-sm btn-light my-2">
        <i class="fas fa-arrow-circle-right"></i>{" "}
        <strong>confirm password</strong>
      </button>
    </form>
  );
  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-3 offset-md-2">
          <strong>register</strong>
          <i>end</i>
          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
