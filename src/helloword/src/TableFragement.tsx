import React from "react";
interface Props {
  names: string[];
}

interface TableProps {
  tds: string[][];
}

class Columns extends React.Component<Props> {
  render() {
    const tds = [];
    for (const name of this.props.names) {
      tds.push(<td>{name}</td>);
    }
    return <React.Fragment>{tds}</React.Fragment>;
  }
}

export default class TableFragement extends React.Component<TableProps> {
  render() {
    const trs = [];
    for (const names of this.props.tds) {
      trs.push(
        <tr>
          <Columns names={names} />
        </tr>
      );
    }
    return <table>{trs}</table>;
  }
}
