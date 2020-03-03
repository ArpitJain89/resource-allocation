import React from "react";
import { Link } from "react-router-dom";
import "./Employee.css";
const resourceData = require("../assets/employees.json");

class EmployeeList extends React.Component {
  projects = [];
  projectId;
  SelectedProjectName = "";
  selectedProjectId = 0;

  constructor() {
    super();
    this.state = {
      selectedProjectEmployees: [],
      projectName: ""
    };

    this.onChangeOfProjectSelect = this.onChangeOfProjectSelect.bind(this);
    this.onClickOfShowAllocation = this.onClickOfShowAllocation.bind(this);
  }

  componentWillMount() {
    this.addDataToSessionStoarge();
  }

  /**
   *
   * @param {*} event - Event
   */
  onChangeOfProjectSelect(event) {
    this.selectedProjectId = parseInt(event.target.value, 10);
    sessionStorage.setItem("projectId", this.selectedProjectId);
    sessionStorage.setItem("selectedProjectId", this.selectedProjectId);
    const selectedProjects = this.projects.filter(
      project => project.id === this.selectedProjectId
    );
    this.SelectedProjectName = selectedProjects[0].name;
    this.selectedProjectEmployees = selectedProjects.length
      ? selectedProjects[0].employees
      : {};
       this.selectedProjectEmployees = this.selectedProjectEmployees.filter(emp=>emp.projectAllocation>0)
  }

  /**
   * This is used to show selected employee
   */
  onClickOfShowAllocation() {
    this.upDateState(this.selectedProjectEmployees, this.SelectedProjectName);
  }

  /**
   *
   * @param {*} employeess -employeess is nothing but selected employee
   * @param {*} projectName -projectName is nothing but selected projectName
   */
  upDateState(employeess, projectName) {
    this.setState({
      selectedProjectEmployees: employeess,
      projectName: projectName
    });
  }
  /**
   * This is used to add date in session storage
   */
  addDataToSessionStoarge() {
    if (!(sessionStorage.getItem("employees") &&
          sessionStorage.getItem("projects")
          )
       ) {
      sessionStorage.setItem(
        "employees",
        JSON.stringify(resourceData.employees)
      );
      sessionStorage.setItem("projects", JSON.stringify(resourceData.projects));
    } else {
      resourceData.projects = JSON.parse(sessionStorage.getItem("projects"));
      //  resourceData.projects.forEach(project => {
      //  return project.employees.filter(emp=>emp.projectAllocation > 0)
      // });

      if (sessionStorage.getItem("projectId") != null) {
        this.selectedProjectId = sessionStorage.getItem("projectId");
        const selectedProjects = resourceData.projects.filter(
          project => project.id === parseInt(this.selectedProjectId)
        );
        this.selectedProjectEmployees = selectedProjects.length
          ? selectedProjects[0].employees
          : {};
          console.log("this.selectedProjectEmployees",this.selectedProjectEmployees);
          this.selectedProjectEmployees = this.selectedProjectEmployees.filter(emp=>emp.projectAllocation >0);
           console.log("this.selectedProjectEmployees",this.selectedProjectEmployees);
        
        this.upDateState( this.selectedProjectEmployees,selectedProjects[0].name);
      }
    }
    this.projects = resourceData.projects;
  }

  render() {
    return (
      <div className="card">
        <div className="card-header text-center font-weight-bolder">
          Resource Allocation
        </div>
        <div className="card-body view-port-height">
          <div className="row">
            <div className="col-3">
              <button type="button">
                <Link to={`${this.selectedProjectId}/employeeAdd`}>
                  Add Employee
                </Link>
              </button>
            </div>

            {/* dropdown form */}
            <div className="col-3">
              <select
                className="form-control"
                onChange={this.onChangeOfProjectSelect}
                id="exampleFormControlSelect1"
              >
                <option>--Select Project--</option>
                {this.projects.map(project => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-4">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.onClickOfShowAllocation}
              >
                Show Allocation
              </button>
            </div>
            <div className="col-2">
              <button type="button">
                <Link to={`./employee/HighChart`}>Show Statistics</Link>
              </button>
            </div>
          </div>

          {/* Employee List */}

          <label>Project Name: {this.state.projectName}</label>

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
              {this.state.selectedProjectEmployees.map((employee, index) => {
                return (
                  <tr key={index}>
                    <td> {employee.id}</td>
                    <td> {employee.emailId}</td>
                    <td> {employee.fullName}</td>
                    <td> {employee.jobLevel}</td>
                    <td> {employee.designation}</td>
                    <td> {employee.projectAllocation}%</td>
                    <td>
                      <Link
                        to={`${this.selectedProjectId}/employee/${employee.id}`}
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                );
              })}

              {this.state.selectedProjectEmployees.length ? null : (
                <tr className="text-center">
                  <td colSpan="7">No data.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        >
      </div>
    );
  }
}

export default EmployeeList;
