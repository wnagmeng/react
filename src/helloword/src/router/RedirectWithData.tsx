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

function UserRedirect(props: any) {
  console.log(props);
  return (
    <Router>
      <Link to="/">Home</Link> | <Link to="/redirect">Redirect Home</Link>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/redirect">
          <UserProfile user={props.user} />
        </Route>
      </Switch>
    </Router>
  );
}

function Home() {
  return <h1>Home</h1>;
}

function UserProfile(props: any) {
  if (props.user) {
    return <h1>User: {props.user.name}</h1>;
  }
  return <Redirect to="/" />;
}

export default function RedirectWithData() {
  return (
    <div>
      <UserRedirect user={{ name: "Eric" }} />
      <UserRedirect />
    </div>
  );
}
