import React from "react";

import Select from "react-select";

class SharedForm extends React.Component {
  employeeDetails = {};
  employees = [];

  constructor(props) {
    super(props);
    this.state = {
      employeeDetails: {},
      show: true
    };

    this.onChangeOfEmployeeForm = this.onChangeOfEmployeeForm.bind(this);
    this.onSubmitOfEmployeeForm = this.onSubmitOfEmployeeForm.bind(this);
  }

  componentWillMount() {
    if (this.props.callFrom == "empEditForm") {
      this.setState({
        employeeDetails: this.props.employeeDetails,
        projectName: this.props.ProjectName
      });
    } else {
      this.employees = this.props.employees.filter(
        emp => emp.allocation !== 100
      );
      this.setState({
        show: false
      });
    }
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

  onChangeOfEmployeeForm(event) {
    let propertyName = event.target.name;
    let propertyValue = event.target.value;
    if (propertyName === "projectAllocation") {
      const allocation = parseInt(propertyValue, 10);
      const freeAllocation = 100 - this.state.employeeDetails.allocation;
      if (
        allocation >
        freeAllocation + this.state.employeeDetails.projectAllocation
      ) {
        return;
      } else {
        propertyValue = parseInt(propertyValue);
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
    this.props.onSubmitOfEmployeeForm(this.state.employeeDetails);
  }
  backToParent() {
    this.props.backToParent();
  }

  render() {
    return (
      <div className="row">
        <div className="col-12">
          <form onSubmit={this.onSubmitOfEmployeeForm}>
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
                  value={this.props.projectName}
                  disabled
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
                  name="empid"
                  value={this.state.employeeDetails.id}
                  disabled
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-md-4 col-form-label text-md-right">
                Employee Name :
              </label>
              <div className="col-md-6">
                {this.state.show ? (
                  <input
                    type="text"
                    id="emp_name"
                    className="form-control"
                    name="employeeName"
                    value={this.state.employeeDetails.fullName}
                    disabled
                  />
                ) : (
                  <Select
                    className="react-selectcomponent"
                    value={this.state.selectedOption}
                    onChange={this.handleChange.bind(this)}
                    getOptionLabel={option => `${option.fullName}`}
                    options={this.employees}
                  />
                )}
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
                  id="employee_start_date"
                  name="startDate"
                  type="date"
                  className="form-control"
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
                  id="employee_end_date"
                  name="endDate"
                  type="date"
                  className="form-control"
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
                {this.state.show ? (
                  <span className="text ">
                    {" "}
                    Note *: Employee can be allocated up to{" "}
                    {this.props.employeeDetails.projectAllocation +
                      (100 - this.props.employeeDetails.allocation)}{" "}
                  </span>
                ) : (
                  <span>
                    employee {this.employeeDetails.allocation} % is allocated
                    for other project
                  </span>
                )}
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
      </div>
    );
  }
}

export default SharedForm;
