import React, { useContext } from "react";

const ThemeContext = React.createContext("dark");
const UserContext = React.createContext("eric");

export default function ContextHook() {
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);
  return (
    <div className={theme} title={user}>
      Layout
    </div>
  );
}
