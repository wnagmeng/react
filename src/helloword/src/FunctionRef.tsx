import React from "react";
import { RefObject } from "react";

export default function FunctionRef(props: any) {
  let textInput = React.createRef<HTMLInputElement>();

  function handleClick() {
    textInput.current!.focus();
  }

  return (
    <div>
      <input type="text" ref={textInput} />
      <input type="button" value="Focus the text input" onClick={handleClick} />
    </div>
  );
}

// function FunctionRef() {
//   return <input />;
// }

// class Parent extends React.Component {
//   private textInput: RefObject<FunctionRef>;
//   constructor(props: any) {
//     super(props);
//     this.textInput = React.createRef<FunctionRef>();
//   }
//   render() {
//     // This will *not* work!
//     return <FunctionRef ref={this.textInput} />;
//   }
// }
