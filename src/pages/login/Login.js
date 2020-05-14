import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import allActions from "./../../store/actions";
import "./Login.css";

export const validateInput = (email, password) => {
  var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line

  if (email.length === 0) {
    return "Email is empty";
  }

  if (!emailRegex.test(email)) {
    return "Email is invalid";
  }

  if (password.length === 0) {
    return "Password is empty";
  }

  if (password.length < 5) {
    return "Password is less than the required characters of five(5)";
  }

  return "Input is valid";
};

export default function Login(props) {
  const [user, setUser] = useState({
    email: "",
    password: "",
    isAdmin: false,
  });

  const [errorMessage, displayErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const dispatch = useDispatch();
  const getUser = useSelector((state) => state.currentUser);

  const loginUser = (event) => {
    event.preventDefault();
    displayErrorMessage(null);
    setLoading(true);

    const { email, password } = user;
    const getResult = validateInput(email, password);

    if (getResult === "Input is valid") {
      axios
        .post("http://localhost:3000/api/v1/signin", {
          email: user.email,
          password: user.password,
          isAdmin: user.isAdmin,
        })
        .then((response) => {
          dispatch(allActions.userActions.loginUser(response.data));
          setLoading(false);

          if (response.data.role === "user") {
            history.push(`/create-story`);
          } else {
            history.push(`/stories`);
          }
        })
        .catch((error) => {
          console.log("error", error);
          displayErrorMessage("An error occured, please try again");
          setLoading(false);
        });
    } else {
      displayErrorMessage(getResult);
      setLoading(false);
    }
  };

  const checkLoginState = () => {
    if (!!getUser.details.token) {
      if (getUser.details.role === "user") {
        history.push(`/create-story`);
      } else {
        history.push(`/stories`);
      }
    }
  };

  useEffect(() => {
    checkLoginState();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div className="login-form-container">
              <h4 className="text-center">Login</h4>
              {errorMessage !== null && (
                <div className="bg-danger p-3 text-white text-center login-error-message">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={loginUser}>
                <div className="login-email-field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    className="form-control"
                    placeholder="Please enter your email"
                    value={user.email}
                    onChange={(e) => {
                      setUser({ ...user, email: e.target.value });
                    }}
                  />
                </div>

                <div className="login-password-field">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    type="password"
                    className="form-control"
                    placeholder="Please enter your password"
                    value={user.password}
                    onChange={(e) => {
                      setUser({ ...user, password: e.target.value });
                    }}
                  />
                </div>

                <div className="d-flex justify-content-center">
                  <div className="btn-group" aria-label="">
                    <button
                      type="button"
                      className={
                        user.isAdmin === false
                          ? "btn btn-primary"
                          : "btn btn-default"
                      }
                      onClick={() => {
                        setUser({ ...user, isAdmin: false });
                      }}>
                      User
                    </button>
                    <button
                      type="button"
                      className={
                        user.isAdmin === true
                          ? "btn btn-primary"
                          : "btn btn-default"
                      }
                      onClick={() => {
                        setUser({ ...user, isAdmin: true });
                      }}>
                      Admin
                    </button>
                  </div>
                </div>

                <div className="d-flex justify-content-center">
                  <button
                    disabled={loading}
                    className="btn btn-primary"
                    onClick={loginUser}>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </div>
  );
}
