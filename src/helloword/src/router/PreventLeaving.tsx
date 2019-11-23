import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Prompt
} from "react-router-dom";

export default function PreventLeaving() {
  return (
    <Router>
      <Link to="/">Home</Link> | <Link to="/about">About</Link> |{" "}
      <Link to="/form">Form</Link>
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/form">
          <PreventForm />
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

function PreventForm() {
  let [isLeaving, setIsLeaving] = useState(false);

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        form.reset();
        setIsLeaving(false);
      }}
    >
      <Prompt
        when={isLeaving}
        message={location =>
          `Are you sure you want to go to ${location.pathname}`
        }
      />

      <input
        size={50}
        placeholder="type something to block transitions"
        onChange={event => {
          setIsLeaving(event.target.value.length > 0);
        }}
      />
      <input type="submit" value="Sumbit" />
    </form>
  );
}
