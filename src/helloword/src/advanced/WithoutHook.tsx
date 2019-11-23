import React from "react";

interface State {
  count: number;
}

interface Props {}

export default class WithoutHook extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      count: 0
    };
  }
  setCount(count: number) {
    this.setState({
      count
    });
  }
  render() {
    return (
      <div>
        <h1>WithoutHook</h1>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setCount(this.state.count + 1)}>
          Click me
        </button>
      </div>
    );
  }
}
