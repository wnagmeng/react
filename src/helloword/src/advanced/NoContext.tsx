import React from "react";
import "./NoContext.scss";

export default class NoContext extends React.Component {
  render() {
    return <Toolbar theme="dark" />;
  }
}

interface UIStyle {
  theme: string;
  children?: any;
}

function Toolbar(props: UIStyle) {
  return (
    <div>
      <ThemedButton theme={props.theme} />
    </div>
  );
}

function Button(props: UIStyle) {
  return <button className={props.theme}>{props.children}</button>;
}

class ThemedButton extends React.Component<UIStyle> {
  render() {
    return <Button theme={this.props.theme}>NoContext</Button>;
  }
}
