import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
import "./Link.css";

function Users() {
  let { path, url } = useRouteMatch();

  return (
    <Router>
      <Link to={`${url}/user/Alice`}>Alice</Link> |{" "}
      <Link to={`${url}/user/Bob`}>Bob</Link> |{" "}
      <Link to={`${url}/user/Carol`}>Carol</Link> |{" "}
      <Link to={`${url}/user/Dick`}>Dick</Link>
      <Switch>
        <Route path={`${path}/user/:name`}>
          <User />
        </Route>
      </Switch>
    </Router>
  );
}
function User(props: any) {
  let { name } = useParams();

  return <h1>Hello, {name}!</h1>;
}

export default function NestedUsers() {
  return (
    <Router>
      <Link to="/">Home</Link> | <Link to="/list">Users</Link>
      <Switch>
        <Route path="/list">
          <Users />
        </Route>
      </Switch>
    </Router>
  );
}
