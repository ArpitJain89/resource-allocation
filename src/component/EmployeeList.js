import React from "react";
import "./Employee.css";
import PropTypes from "prop-types";
import Select from "react-select";
import Employee from "./Employee";
const resourceData = require("../assets/employees.json");
class EmployeeList extends React.Component {
  projects = [];
  employees = [];

  constructor(props) {
    super(props);
    this.state = {
      selectedProjectEmployees: [],
      show: true,
      selectedOption: null,
      editEmployee: {},
      projectName: ""
    };
    this.onClickOfShowAllocation = this.onClickOfShowAllocation.bind(this);
    this.getSelectedproject = this.getSelectedproject.bind(this);
  }

  componentWillMount() {
    this.employees = resourceData.employees;
    this.projects = resourceData.projects;
  }

  getSelectedproject(obj) {
    this.selectedProjectId = obj.id;
    const selectedProject = this.projects.filter(
      project => project.id === obj.id
    );
    this.selectedProjectEmployees = selectedProject[0].employees;
    this.setState({
      selectedOption: obj.projectName,
      projectName: obj.name
    });
  }

  onClickOfShowAllocation() {
    this.setState({
      selectedProjectEmployees: this.selectedProjectEmployees,
      selectedOption: this.state.selectedOption
    });
  }

  upDateEmployee(emp) {
    this.setState({
      show: false,
      editEmployee: emp
    });
  }

  submitUpdatedEmployee(employee) {
    this.selectedProjectEmployees.forEach(emp => {
      if (emp.id == employee.id) {
        emp = employee;
      }
    });
    //employee allocation  update in project
    this.employees.forEach(emp => {
      if (emp.id == employee.id) {
        emp.allocation = employee.allocation;
      }
    });

    this.setState({
      show: true
    });
  }

  render() {
    return (
      <div className="">
        {this.state.show ? (
          <div>
            <div className="row">
              <div className="col-3 thead-light font-weight-bold ">
                <label>Project Name : {this.state.projectName}</label>
              </div>
              <div className="col-3 ">
                <Select
                  className="react-selectcomponent"
                  value={this.state.selectedOption}
                  onChange={this.getSelectedproject}
                  getOptionLabel={option => `${option.name}`}
                  options={this.projects}
                />
              </div>
              <div className="col-3">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.onClickOfShowAllocation}
                >
                  Show Allocation
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                {" "}
                <table className="table mt-3">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Employee Id</th>
                      <th scope="col">Email Id</th>
                      <th scope="col">Full Name</th>
                      <th scope="col">Job Level</th>
                      <th scope="col">Designation</th>
                      <th scope="col">Allocation</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.selectedProjectEmployees.map(
                      (employee, index) => {
                        return (
                          <tr key={index}>
                            <td> {employee.id}</td>
                            <td> {employee.emailId}</td>
                            <td> {employee.fullName}</td>
                            <td> {employee.jobLevel}</td>
                            <td> {employee.designation}</td>
                            <td> {employee.projectAllocation}%</td>
                            <td>
                              <button
                                onClick={this.upDateEmployee.bind(
                                  this,
                                  employee
                                )}
                              >
                                Edit
                              </button>
                            </td>
                          </tr>
                        );
                      }
                    )}

                    {this.state.selectedProjectEmployees.length ? null : (
                      <tr className="text-center">
                        <td colSpan="7">No data.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="card-body view-port-height">
            <Employee
              employeeDetails={this.state.editEmployee}
              ProjectName={this.state.projectName}
              updateEmployee={this.submitUpdatedEmployee.bind(this)}
            ></Employee>
          </div>
        )}
      </div>
    );
  }
}

EmployeeList.propTypes = {
  submitUpdatedEmployee: PropTypes.func,
  ProjectName: PropTypes.string,
  employeeDetails: PropTypes.object
};

export default EmployeeList;
