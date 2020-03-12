import React from "react";
import Select from "react-select";
import "./Employee.css";

class EmployeeAdd extends React.Component {
  employeeDetails = {};
  employees = [];

  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      employeeDetails: {}
    };
    this.onChangeOfEmployeeForm = this.onChangeOfEmployeeForm.bind(this);
  }
  componentWillMount() {
     this.employees = this.props.employees.filter(
       emp => emp.allocation !== 100
     );
  }

  onChangeOfEmployeeForm(event) {
    let propertyName = event.target.name;
    let propertyValue = event.target.value;
    if (propertyName === "projectAllocation") {
      const allocation = parseInt(propertyValue, 10);
      const freeAllocation = 100 - this.employeeDetails.allocation;
      if (allocation > freeAllocation) {
        return;
      } else {
        propertyValue = parseInt(propertyValue, 10);
      }
    }
    this.setState({
      employeeDetails: {
        ...this.state.employeeDetails,
        [propertyName]: propertyValue
      }
    });
  }

  onSubmitOfEmployeeForm(event) {
    event.preventDefault();
    this.props.addEmployees(this.state.employeeDetails);
  }

  handleChange(val) {
    const selectedEmployeeId = parseInt(val.id, 10);
    this.employeeDetails = this.employees.filter(
      emp => emp.id === selectedEmployeeId
    )[0];
    this.setState({
      selectedOption: val.projectName,
      employeeDetails: val
    });
  }
  backToParent() {
    this.props.updateState("ShowList");
  }
  render() {
    return (
      <div>
        <form name="my-form" onSubmit={this.onSubmitOfEmployeeForm.bind(this)}>
          <div className="form-group row">
            <label className="col-md-4 col-form-label text-md-right">
              Project Name :
            </label>
            <div className="col-md-6">
              <input
                type="text"
                id="emp_id"
                className="form-control"
                name="emp_id"
                value={this.props.projectName}
                disabled
              />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-md-4 col-form-label text-md-right">
              Employee Name :
            </label>
            <div className="col-md-6">
              <Select
                className="react-selectcomponent"
                value={this.state.selectedOption}
                onChange={this.handleChange.bind(this)}
                getOptionLabel={option => `${option.fullName}`}
                options={this.employees}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-md-4 col-form-label text-md-right">
              Employee Id :
            </label>
            <div className="col-md-6">
              <input
                type="text"
                id="emp_id"
                className="form-control"
                name="emp_id"
                value={this.state.employeeDetails.id}
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
                value={this.state.employeeDetails.emailId}
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
                value={this.state.employeeDetails.jobLevel}
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
                value={this.state.employeeDetails.designation}
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
                className="form-control"
                type="date"
                id="startdate"
                name="startDate"
                value={this.state.employeeDetails.startDate}
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
                type="date"
                className="form-control"
                id="inputPassword"
                name="endDate"
                value={this.state.employeeDetails.endDate}
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
                value={this.state.employeeDetails.projectAllocation}
                onChange={this.onChangeOfEmployeeForm}
              />
              <span>
                employee {this.employeeDetails.allocation} % is allocated for
                other project
              </span>
            </div>
          </div>

          <div className="row col-md-6 offset-md-4 ">
            <button type="submit" className="btn btn-primary mr-1">
              Submit
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.backToParent.bind(this)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default EmployeeAdd;
