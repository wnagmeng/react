import React from "react";

const ThemeContext = React.createContext("light");

export default class WithContext extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

interface UIStyle {
  theme: string;
  children?: any;
}

class Toolbar extends React.Component {
  static contextType = ThemeContext;
  render() {
    return (
      <div>
        <ThemedButton theme={this.context} />
      </div>
    );
  }
}
function Button(props: UIStyle) {
  return <button className={props.theme}>{props.children}</button>;
}

class ThemedButton extends React.Component<UIStyle> {
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context}>With Context</Button>;
  }
}
