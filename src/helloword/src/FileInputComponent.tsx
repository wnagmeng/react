import React, { RefObject, SyntheticEvent } from "react";

export default class FileInputComponent extends React.Component {
  private fileInput: RefObject<HTMLInputElement>;

  constructor(props: any) {
    super(props);
    this.fileInput = React.createRef<HTMLInputElement>();
  }

  onSelected(e: SyntheticEvent) {
    e.preventDefault();
    alert(`Selected file - ${this.fileInput!.current!.files![0].name}`);
  }

  render() {
    return (
      <div>
        <input
          type="file"
          ref={this.fileInput}
          onChange={e => this.onSelected(e)}
        />
      </div>
    );
  }
}
