import React, { RefObject, SyntheticEvent } from "react";

export default class UncontrolledComponent extends React.Component {
  private textInput: RefObject<HTMLInputElement>;

  constructor(props: any) {
    super(props);
    this.textInput = React.createRef();
  }

  focusTextInput(e: SyntheticEvent) {
    this.textInput!.current!.focus();
  }

  render() {
    return (
      <div>
        <input
          type="text"
          defaultValue="UncontrolledComponent"
          ref={this.textInput}
        />
        <button
          onClick={e => {
            this.focusTextInput(e);
          }}
        >
          Focus
        </button>
      </div>
    );
  }
}
