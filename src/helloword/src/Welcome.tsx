import React from "react";

interface Properties  {
  name: string
};

class Welcome extends React.Component<Properties, {}> {

  render() {
      return <h1>Hello, {this.props.name}</h1>;
  }
}

export default Welcome;
