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

function MyLink(props: any) {
  let matched = useRouteMatch({
    path: props.to,
    exact: props.exact
  });

  return (
    <span className={matched ? "active" : ""}>
      {matched ? "> " : ""}
      <Link to={props.to}>{props.children}</Link>
    </span>
  );
}

export default function CustomizedLink(props: any) {
  return (
    <Router>
      <MyLink to="/user/Alice">Alice</MyLink> |{" "}
      <MyLink to="/user/Bob">Bob</MyLink> |{" "}
      <MyLink to="/user/Carol">Carol</MyLink> |{" "}
      <MyLink to="/user/Dick">Dick</MyLink>
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
