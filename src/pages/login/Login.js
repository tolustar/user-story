import React, { useState } from "react";
import { useDispatch } from "react-redux";
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

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    isAdmin: false,
  });

  const [errorMessage, displayErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  

  const loginUser = (event) => {
    event.preventDefault();
    displayErrorMessage(null);
    setLoading(true);

    const getResult = validateInput(user.email, user.password);

    if (getResult === "Input is valid") {
      axios
        .post("http://localhost:3000/api/v1/signin", {
          email: user.email,
          password: user.password,
          isAdmin: user.isAdmin,
        })
        .then((response) => {
          console.log("response", response);
          dispatch(allActions.userActions.loginUser(user));
          setLoading(false);
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

  return (
    <div className="login">
      <div className="bg-teal">
        <h2>User Story</h2>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div className="form-container">
              {errorMessage !== null && (
                <div className="bg-danger p-3 text-white text-center errorMessage">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={loginUser}>
                <div className="email-field">
                  <label htmlFor="email"></label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Please enter your email"
                    value={user.email}
                    onChange={(e) => {
                      setUser({ ...user, email: e.target.value });
                    }}
                  />
                </div>

                <div className="password-field">
                  <label htmlFor="password"></label>
                  <input
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
                        user.isAdmin === "admin"
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
