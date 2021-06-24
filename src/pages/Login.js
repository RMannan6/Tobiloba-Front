import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../firebase.js";
import { toast } from "react-toastify";
import { Button } from "antd";
import { LoginOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrUpdateUser } from "../functions/auth";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    let intended = history.location.state;
    if (intended) {
      return;
    } else if (user && user.token) {
      history.push("/");
    }
  }, [user, history]);

  let dispatch = useDispatch();

  const roleBasedRedirect = (res) => {
    // check if intended
    let intended = history.location.state;
    if (intended) {
      history.push(intended.from);
    } else {
      if (res.data.role === "admin") {
        history.push("/admin/dashboard");
      } else {
        history.push("/user/history");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

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
          roleBasedRedirect(res);
        })
        .catch((err) => console.log(err));

      // history.push("/");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };
  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();

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
            roleBasedRedirect(res);
          })
          .catch();
        // history.push("/");
      })
      .catch((err) => toast.error(err.message));
  };
  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          className="form-control form-control-sm my-1 shadow-3 p-1"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="enter your email..."
          size="sm"
          autoFocus
        />
      </div>

      <div className="form-group">
        <input
          type="password"
          className="form-control form-control-sm my-1 shadow-3 p-1"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="key in password..."
          autoFocus
        />
      </div>
      <div className="site-button-ghost-wrapper">
        <Button
          ghost
          onClick={handleSubmit}
          className="mb-1 "
          block
          shape="round"
          icon={<LoginOutlined />}
          size="small"
          disabled={!email || password.length < 6}
        >
          &nbsp; <strong>login</strong>
        </Button>
      </div>
    </form>
  );
  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-3 offset-md-2">
          {loading ? (
            <h4 className="text-warning">loading...please wait.</h4>
          ) : (
            <>
              <strong>login</strong> <i>welcome</i>
            </>
          )}
          {loginForm()}
          <Button
            ghost
            type="danger"
            onClick={googleLogin}
            className="mb-1 "
            block
            shape="round"
            icon={<GoogleOutlined />}
            size="small"
          >
            &nbsp; <strong>Google login</strong>
          </Button>

          <Link to="/forgot/password" className="float-right text-danger">
            forgot your password?
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Login;
