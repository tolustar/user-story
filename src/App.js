import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./pages/login/Login";
import CreateStory from "./pages/createStory/CreateStory";

import "./App.css";

function App() {
  return (
    <>
      <div className="bg-teal">
        <h2>User Story</h2>
      </div>
      <Router>
        <Switch>
          <Route path="/create-story">
            <CreateStory />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
