import React from "react";

const ThemeContext = React.createContext("dark");
const UserContext = React.createContext("eric");

function Layout() {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <UserContext.Consumer>
          {user => (
            <div className={theme} title={user}>
              Layout
            </div>
          )}
        </UserContext.Consumer>
      )}
    </ThemeContext.Consumer>
  );
}

export default class MultiContextHook extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value={"dark"}>
        <UserContext.Provider value={"eric"}>
          <Layout />
        </UserContext.Provider>
      </ThemeContext.Provider>
    );
  }
}
