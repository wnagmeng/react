import React from "react";

const ThemeContext = React.createContext("2");
const UserContext = React.createContext("1");

function Layout() {
  return <div>Layout</div>;
}

export default class FunctionContext extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value={"1"}>
        <UserContext.Provider value={"2"}>
          <Layout />
        </UserContext.Provider>
      </ThemeContext.Provider>
    );
  }
}
