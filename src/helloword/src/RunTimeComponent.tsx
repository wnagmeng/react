import React from "react";

import { MyModule } from "./ABComponent";

export default function RunTimeComponent(props: any) {
  let Component = MyModule.AComponent;
  if (props.type === "B") {
    Component = MyModule.BComponent;
  }
  return <Component name={props.type + "Component"} />;
}
