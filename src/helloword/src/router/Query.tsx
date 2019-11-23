import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation
} from "react-router-dom";

export default function AppRouted() {
  return (
    <Router>
      <Link to="/">Home</Link> | <Link to="/about?aa=1100">About</Link> |{" "}
      <Link to="/query?name=hello&amp;ab=1">Users</Link>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="*">
          <Query />
        </Route>
      </Switch>
    </Router>
  );
}

function Home() {
  return <h1>Home</h1>;
}

function Query() {
  const search = useLocation().search;
  console.log(search);
  const query = new URLSearchParams(search);
  console.log(query);
  const queries = [];
  for (const [key, value] of query) {
    queries.push(
      <li>
        name: {key}, value: {value}
      </li>
    );
  }
  if (!queries.length) {
    return <h1>No Query Found!</h1>;
  }
  return (
    <div>
      <h1>Queries</h1>
      <ul>{queries}</ul>
    </div>
  );
}
