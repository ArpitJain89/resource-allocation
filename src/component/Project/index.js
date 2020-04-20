import React from "react";
import Table from "./Table";

const resourceData = require("../../assets/employees.json");

class projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      headers: []
    };
  }
  componentWillMount() {
    var keys = [
      "id",
      "name",
      "clientName",
      "managerName",
      "unit",
      "startDate",
      "endDate"
    ];
    this.setState({
      data: resourceData.projects,
      keys: keys
    });
  }

  render() {
    return (
      <div>
        <Table {...this.state}></Table>
      </div>
    );
  }
}
export default projects;
