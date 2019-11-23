import React from "react";

export const MyModule = {
  AComponent: function AComponent(props: any) {
    return <h1>This is {props.name}.</h1>;
  },
  BComponent: function BComponent(props: any) {
    return <h1>This is {props.name}.</h1>;
  }
};

export default function ABComponent() {
  return (
    <div>
      <MyModule.AComponent name="AComponent" />
      <MyModule.BComponent name="BComponent" />
    </div>
  );
}
