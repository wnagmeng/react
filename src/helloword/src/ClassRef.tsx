import DOMRef from "./DOMRef";
import React, { RefObject, SyntheticEvent } from "react";

import "./ClassRef.css";

class ClassRef extends React.Component {
  private textInput: RefObject<DOMRef>;
  constructor(props: any) {
    super(props);
    this.textInput = React.createRef<DOMRef>();
  }

  mouseOver(e: SyntheticEvent) {
    this.textInput.current!.focusTextInput(e);
  }

  render() {
    return (
      <div
        onMouseOver={e => {
          this.mouseOver(e);
        }}
      >
        <h1>Focus</h1>
        <DOMRef ref={this.textInput} />
      </div>
    );
  }
}

export default ClassRef;

