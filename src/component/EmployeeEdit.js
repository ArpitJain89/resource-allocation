import React from "react";
import SharedForm from "./SharedForm";
import "./Employee.css";
class Employee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeDetails: {},
      empEditForm: "empEditForm"
    };
   this.onSubmitOfEmployeeForm = this.onSubmitOfEmployeeForm.bind(this);
  }

  componentWillMount() {
    this.setState({
      employeeDetails: this.props.employeeDetails,
      projectName: this.props.ProjectName
    });
  }

  onSubmitOfEmployeeForm(employeeDetails) {
    this.props.updateEmployee(employeeDetails);
  }
  backToParent() {
    this.props.updateState("ShowList");
  }

  render() {
    return (
      <div>
        <SharedForm
          callFrom={this.state.empEditForm}
          projectName={this.state.projectName}
          employeeDetails={this.state.employeeDetails}
          onSubmitOfEmployeeForm={this.onSubmitOfEmployeeForm}
          backToParent={this.backToParent.bind(this)}
        ></SharedForm>
      </div>
    );
  }
}

export default Employee;
