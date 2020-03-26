import React from "react";

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.getHeader = this.getHeader.bind(this);
    this.getRowsData = this.getRowsData.bind(this);
  }

  getHeader() {
    if (this.props.keys.length != null) {
      return this.props.keys.map(key => {
        return <th key={key}>{key.toUpperCase()}</th>;
      });
    }
  }

  getRowsData() {
    let items = this.props.data;
    let keys = this.props.keys;
    return items.map((row, index) => {
      return (
        <tr key={index}>
          <RenderRow key={index} data={row} keys={keys} />
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <div>
          <table className="table mt-3">
            <thead className="thead-light ">
              <tr >{this.getHeader()}</tr>
            </thead>
            <tbody>{this.getRowsData()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default Table;

const RenderRow = props => {
  return props.keys.map((key, index) => {
    return <td key={props.data[key]}>{props.data[key]}</td>;
  });
};
