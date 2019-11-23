import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function AppRouted() {
  return (
    <Router>
      <Link to="/">Home</Link> | <Link to="/about">About</Link> |{" "}
      <Link to="/users">Users</Link>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

function Home() {
  return <h1>Home</h1>;
}

function NotFound() {
  return <h1>404 Not Found!</h1>;
}
