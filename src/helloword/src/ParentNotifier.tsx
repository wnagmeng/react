import React from "react";
interface Props {
  handle: Function;
}
interface State {
  value: string;
}

class ParentNotifier extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e: any) {
    this.setState({ value: e.target.value });
    this.props.handle(e.target.value);
  }

  render() {
    return <input value={this.state.value} onChange={this.handleChange} />;
  }
}
