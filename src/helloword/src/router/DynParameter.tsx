import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import "./Link.css";

export default function Users(props: any) {
  return (
    <Router>
      <Link to="/user/Alice">Alice</Link> | <Link to="/user/Bob">Bob</Link> |{" "}
      <Link to="/user/Carol">Carol</Link> | <Link to="/user/Dick">Dick</Link>
      <Switch>
        <Route path="/user/:name">
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
