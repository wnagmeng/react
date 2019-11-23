import React from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function BadOrdered() {
  return (
    <Router>
      <Link to="/">Home</Link> | <Link to="/about">About</Link> |{" "}
      <Link to="/users">Users</Link>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
      </Switch>
    </Router>
  );
}

function Home() {
  return <h1>Home</h1>;
}

function About() {
  return <h1>About</h1>;
}

function Users() {
  return <h1>Users</h1>;
}
