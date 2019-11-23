import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
  useRouteMatch
} from "react-router-dom";

// Sometimes you don't know all the possible routes
// for your application up front; for example, when
// building a file-system browsing UI or determining
// URLs dynamically based on data. In these situations,
// it helps to have a dynamic router that is able
// to generate routes as needed at runtime.
//
// This example lets you drill down into a friends
// list recursively, viewing each user's friend list
// along the way. As you drill down, notice each segment
// being added to the URL. You can copy/paste this link
// to someone else and they will see the same UI.
//
// Then click the back button and watch the last
// segment of the URL disappear along with the last
// friend list.

export default function Recursive() {
  return (
    <Router>
      <Switch>
        <Route path="/:id">
          <Person />
        </Route>
      </Switch>
    </Router>
  );
}

function Person() {
  let { url } = useRouteMatch();
  let { id } = useParams();
  let person = find(parseInt(id as string));
  if (!person) {
    return null;
  }

  return (
    <ul>
      <li style={{ listStyleType: "none" }}>
        <h3>{person.name}’s Friends</h3>
      </li>
      {person.friends.map((id: number) => {
        const found = find(id);
        if (!found) {
          return null;
        }
        return (
          <li key={id}>
            <Link to={`${url}/${id}`}>{found.name}</Link>
          </li>
        );
      })}
      <li style={{ listStyleType: "none" }}>
        <Switch>
          <Route path={`${url}/:id`}>
            <Person />
          </Route>
        </Switch>
      </li>
    </ul>
  );
}

interface IPerson {
  id: number;
  name: string;
  friends: number[];
}

const persons: IPerson[] = [
  { id: 0, name: "Michelle", friends: [1, 2, 3] },
  { id: 1, name: "Sean", friends: [0, 3] },
  { id: 2, name: "Kim", friends: [0, 1, 3] },
  { id: 3, name: "David", friends: [1, 2] }
];

function find(id: number): IPerson | undefined {
  return persons.find(p => p.id === id);
}
