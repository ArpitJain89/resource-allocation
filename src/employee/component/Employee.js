import React from "react";

import { Redirect} from "react-router";
class Employee extends React.Component {
  employeeDetails = {};
  constructor(props) {
    super(props);

    this.state = {
      projectAllocation: 0,
      startDate: "",
      endDate: "",
      projectId: "",
      redirect: 0
    };

    this.onChangeOfEmployeeForm = this.onChangeOfEmployeeForm.bind(this);
    this.onSubmitOfEmployeeForm = this.onSubmitOfEmployeeForm.bind(this);
  }

  componentWillMount() {
    this.getEmployeDetails();
  }

  getEmployeDetails() {
    this.employeeDetails = this.props.employeeDetails;
    this.setState({
      startDate: this.employeeDetails.startDate,
      endDate: this.employeeDetails.endDate,
      projectAllocation: this.employeeDetails.projectAllocation,
      projectName: this.props.ProjectName
    });
  }

  onChangeOfEmployeeForm(event) {
    let propertyName = event.target.name;
    let propertyValue = event.target.value;
    if (propertyName === "projectAllocation") {
      const allocation = parseInt(propertyValue, 10);
      const freeAllocation = 100 - this.employeeDetails.allocation;
      if (
        allocation >
        freeAllocation + this.employeeDetails.projectAllocation
      ) {
        return;
      } else {
      }
    }
    this.setState({
      [propertyName]: propertyValue
    });
  }

  onSubmitOfEmployeeForm(event) {
    event.preventDefault();
    this.employeeDetails.projectAllocation = this.state.projectAllocation;
    this.employeeDetails.startDate = this.state.startDate;
    this.employeeDetails.endDate = this.state.endDate;
    this.props.updateEmployee(this.employeeDetails);
    this.setState({
      redirect: 1
    });
  }

  render() {
    if (this.state.redirect === 1)
      return (
        <Redirect
          to={{
            pathname: "/component/EmployeeList"
          }}
        />
      );
    return (
      <div className="row">
        <div className="col-12">
          <form onSubmit={this.onSubmitOfEmployeeForm}>
            <div className="form-group row">
              <label className="col-md-4 col-form-label text-md-right">
                Employee Id :
              </label>
              <div className="col-md-6">
                <input
                  type="text"
                  id="emp_id"
                  className="form-control"
                  name="empid"
                  value={this.employeeDetails.id}
                  disabled
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-md-4 col-form-label text-md-right">
                project Name :
              </label>
              <div className="col-md-6">
                <input
                  type="text"
                  id="project_name"
                  className="form-control"
                  name="projectName"
                  value={this.state.projectName}
                  disabled
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-md-4 col-form-label text-md-right">
                Employee Name :
              </label>
              <div className="col-md-6">
                <input
                  type="text"
                  id="emp_name"
                  className="form-control"
                  name="employeeName"
                  value={this.employeeDetails.fullName}
                  disabled
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-md-4 col-form-label text-md-right">
                E-Mail Address :
              </label>
              <div className="col-md-6">
                <input
                  type="text"
                  id="email_address"
                  className="form-control"
                  name="emailId"
                  value={this.employeeDetails.emailId}
                  disabled
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-md-4 col-form-label text-md-right">
                Job Level :
              </label>
              <div className="col-md-6">
                <input
                  type="text"
                  id="job_level"
                  className="form-control"
                  name="jobLevel"
                  value={this.employeeDetails.jobLevel}
                  disabled
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-md-4 col-form-label text-md-right">
                Designation :
              </label>
              <div className="col-md-6">
                <input
                  type="text"
                  id="designation"
                  name="designation"
                  className="form-control"
                  value={this.employeeDetails.designation}
                  disabled
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-md-4 col-form-label text-md-right">
                Start Date :
              </label>
              <div className="col-md-6">
                <input
                  id="employee_start_date"
                  name="startDate"
                  type="date"
                  className="form-control"
                  value={this.employeeDetails.startDate}
                  onChange={this.onChangeOfEmployeeForm}
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-md-4 col-form-label text-md-right">
                End Date :
              </label>
              <div className="col-md-6">
                <input
                  id="employee_end_date"
                  name="endDate"
                  type="date"
                  className="form-control"
                  value={this.state.endDate}
                  onChange={this.onChangeOfEmployeeForm}
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-md-4 col-form-label text-md-right">
                Allocation :
              </label>
              <div className="col-md-6">
                <input
                  id="employee_allocation"
                  name="projectAllocation"
                  type="number"
                  className="form-control"
                  value={this.state.projectAllocation}
                  onChange={this.onChangeOfEmployeeForm}
                />
                <span className="text ">
                  {" "}
                  Note *: Employee can be allocated up to{" "}
                  {this.employeeDetails.projectAllocation +
                    (100 - this.employeeDetails.allocation)}{" "}
                </span>
              </div>
            </div>

            <div className="col-md-6 offset-md-4">
              <button
                type="submit"
                className="btn btn-primary"
                
              >
                Update
              </button>
            
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Employee;
