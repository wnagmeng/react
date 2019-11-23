import React from "react";

interface States {
  date: Date;
};

class Clock extends React.Component<{}, States> {
  private timer:NodeJS.Timeout;
  constructor(props:any) {
    super(props);
    this.state = { date: new Date() };
    this.timer = setInterval(() => {}, 1000);
  }

  componentDidMount() {
    clearInterval(this.timer);
    this.timer = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

export default Clock;
