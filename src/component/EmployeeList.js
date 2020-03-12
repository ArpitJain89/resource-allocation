import React from "react";
import "./Employee.css";
import PropTypes from "prop-types";
import Select from "react-select";
import EmployeeEdit from "./EmployeeEdit";
import EmployeeAdd from "./EmployeeAdd";
const resourceData = require("../assets/employees.json");
class EmployeeList extends React.Component {
  projects = [];
  employees = [];
  selectedProjectEmployees = [];
  constructor(props) {
    super(props);
    this.state = {
      selectedProjectEmployees: [],
      show: "ShowList",
      selectedOption: null,
      editEmployee: {},
      projectName: "",
      showAddbtn: false
    };
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
      selectedOption: this.state.selectedOption,
      showAddbtn: true
    });
  }

  upDateEmployee(emp) {
    this.setState({
      show: "ShowEdit",
      editEmployee: emp
    });
  }

  addEmployees(newEmp) {
    this.selectedProjectEmployees.push(newEmp);
    this.employees.forEach(emp => {
      if (emp.id == newEmp.id) {
        emp.allocation = emp.allocation - parseInt(newEmp.projectAllocation);
      }
    });
    this.updateState("ShowList");
  }
  submitUpdatedEmployee(employee) {
     console.log("employee", employee);
    this.selectedProjectEmployees.forEach(emp => {
      if (emp.id == employee.id) {
        console.log("emp", emp);
        emp.allocation =emp.allocation-(emp.projectAllocation-employee.projectAllocation)
          // 100 - (emp.projectAllocation - employee.projectAllocation);
        emp.projectAllocation = employee.projectAllocation;
      }
    });
    this.employees.forEach(emp => {
      if (emp.id == employee.id) {
        emp.allocation = employee.allocation - employee.projectAllocation;
      }
    });
    this.setState({
      selectedProjectEmployees: this.selectedProjectEmployees
    });
    this.updateState("ShowList");
  }
  updateState(showComponenet) {
    this.setState({
      show: showComponenet
    });
  }

  render() {
    return (
      <div className="">
        {this.state.show == "ShowList" ? (
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
                  onClick={this.onClickOfShowAllocation.bind(this)}
                >
                  Show Allocation
                </button>
              </div>
              {this.state.showAddbtn ? (
                <div className="col-3">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.updateState.bind(this, "ShowAdd")}
                  >
                    Add Employee
                  </button>
                </div>
              ) : null}
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
          <div>
            {this.state.show == "ShowEdit" ? (
              <div className="card-body view-port-height">
                <EmployeeEdit
                  employeeDetails={this.state.editEmployee}
                  ProjectName={this.state.projectName}
                  updateEmployee={this.submitUpdatedEmployee.bind(this)}
                  updateState={this.updateState.bind(this)}
                ></EmployeeEdit>
              </div>
            ) : (
              <div>
                <EmployeeAdd
                  projectName={this.state.projectName}
                  addEmployees={this.addEmployees.bind(this)}
                  employees={resourceData.employees}
                  updateState={this.updateState.bind(this)}
                ></EmployeeAdd>
              </div>
            )}
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
