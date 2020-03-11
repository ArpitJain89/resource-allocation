import React from "react";
import EmployeeCountGraph from "./component/EmployeeCountGraph";
import EmployeeJobLevelGraph from "./component/EmployeeJobLevelGraph";

const resourceData = require("../assets/employees.json");
class HighChart extends React.Component {
  constructor() {
    super();
    this.state = {
      resourceData
    };
  }
  render() {
    return (
        <div className="row">
          <EmployeeCountGraph resourceData={this.state.resourceData} />
          <EmployeeJobLevelGraph resourceData={this.state.resourceData} />
        </div>
    );
  }
}
export default HighChart;
