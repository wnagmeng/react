import React, { RefObject, SyntheticEvent } from "react";

class DOMRef extends React.Component {
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
        <input type="text" ref={this.textInput} />
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

export default DOMRef;
