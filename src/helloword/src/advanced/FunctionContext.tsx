import React from "react";
export const FunctionContext = React.createContext("function component");
export default function FunctionComponent() {
  return (
    <FunctionContext.Consumer>
      {name => <button title={name}>Function Context</button>}
    </FunctionContext.Consumer>
  );
}
