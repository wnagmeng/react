import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  Redirect
} from "react-router-dom";
import "./Link.css";

export default function Navs(props: any) {
  return (
    <Router>
      <Link to="/">Home</Link> |{" "}
      <NavLink to="/about" activeClassName="active">
        About
      </NavLink>{" "}
      | <Link to="/users">Users</Link>|<Link to="/redirect">Redirect Home</Link>
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
        <Route path="/redirect">
          props.user ? <User user={props.user} /> : <Redirect to="/" />
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

function User(props: any) {
  return <h1>User: {props.name}</h1>;
}
