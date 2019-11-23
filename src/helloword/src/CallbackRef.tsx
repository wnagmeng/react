import { RefObject } from "react";
import React from "react";
import { statement } from "@babel/template";

function InnerRef(props: any) {
  return <input ref={props.callbackRef} />;
}

export default class CallbackRef extends React.Component {
  private textInput: HTMLInputElement | null;
  constructor(props: any) {
    super(props);
    this.textInput = null;
  }

  setTextInputRef = (element: any) => {
    this.textInput = element;
  };

  focusTextInput = () => {
    // Focus the text input using the raw DOM API
    if (this.textInput) this.textInput!.focus();
  };

  render() {
      return (
      <div>
        <InnerRef callbackRef={(e:any) => this.setTextInputRef(e)} />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
