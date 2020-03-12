import React from "react";
import Select from "react-select";
import "./Employee.css";
import SharedForm from "./SharedForm";

class EmployeeAdd extends React.Component {
  employees = [];
  constructor(props) {
    super(props);
    this.state = {
      empAddForm: "empAddForm"
    };
  }
  componentWillMount() {
    this.employees = this.props.employees.filter(emp => emp.allocation !== 100);
  }
  onSubmitOfEmployeeForm(employeeDetails) {
    this.props.addEmployees(employeeDetails);
  }
  backToParent() {
    this.props.updateState("ShowList");
  }
  render() {
    return (
      <div>
        <SharedForm
          callfrom={this.state.empAddForm}
          projectName={this.props.projectName}
          employees={this.employees}
          onSubmitOfEmployeeForm={this.onSubmitOfEmployeeForm.bind(this)}
          backToParent={this.backToParent.bind(this)}
        ></SharedForm>
      </div>
    );
  }
}

export default EmployeeAdd;
