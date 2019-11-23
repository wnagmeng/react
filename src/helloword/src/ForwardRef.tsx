import { RefObject } from "react";
import React from "react";

const InnerRef = React.forwardRef(
  (props, ref: React.LegacyRef<HTMLInputElement>) => <input ref={ref} />
);

export default class ForwardRef extends React.Component {
  private textInput: RefObject<HTMLInputElement>;
  constructor(props: any) {
    super(props);
    this.textInput = React.createRef<HTMLInputElement>();
  }
  
  focusTextInput = () => {
    this.textInput!.current!.focus();
  };

  render() {
    return (
      <div>
        <InnerRef ref={this.textInput} />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
