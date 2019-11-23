import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function AppRouted() {
  return (
    <Router>
      <Link to="/">Home</Link> | <Link to="/about">About</Link> |{" "}
      <Link to="/users">Users</Link>
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <Home />
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
