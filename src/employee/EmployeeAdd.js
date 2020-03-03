import React from "react";
import "./Employee.css";

class EmployeeAdd extends React.Component {
  employeeDetails = {};
  projects = [];
  employee = {};
  employees = [];
  projectId;
  selectedEmployeeId;
  empAllocation = 0;

  constructor(props) {
    super(props);
    this.state = {
      projectAllocation: 0,
      empAllocation: 0,
      startDate: new Date(),
      endDate: new Date()
    };
    this.projectId = this.props.match.params.projectId;
    console.log(" this.projectId ", this.projectId);
    this.onChangeOfEmployeeSelect = this.onChangeOfEmployeeSelect.bind(this);
    this.onChangeOfEmployeeForm = this.onChangeOfEmployeeForm.bind(this);
    this.onSubmitOfEmployeeForm = this.onSubmitOfEmployeeForm.bind(this);
  }
  componentWillMount() {
    this.getEmployeDetails();
  }
  removeDuplicates(collection) {
    return [...new Set(collection)];
  }
  getEmployeDetails() {
    this.employees = JSON.parse(sessionStorage.getItem("employees"));
    this.projects = JSON.parse(sessionStorage.getItem("projects"));
    console.log("this.projects ", this.projects);
   this.employees = this.employees.filter(emp => emp.allocation != 100);
    //get Employee for that  project
    // const projectEmployee = this.projects.filter(
    //   project => project.id === parseInt(this.projectId)
    // );

    // const allEmployees = employees.filter(emp => emp.allocation != 100);

    // const removeDuplicateEmp = this.removeDuplicates([
    //   ...allEmployees,
    //   ...projectEmployee[0].employees
    // ]);

    // console.log("removeDuplicateEmp", removeDuplicateEmp);

    // var result = removeDuplicateEmp.reduce((unique, o) => {
    //   if (!unique.some(obj => obj.id === o.id && obj.value === o.value)) {
    //     unique.push(o);
    //   }
    //   return unique;
    // }, []);

    // console.log("Unique", result);

    // var oldItems = result.filter(n => projectEmployee[0].employees.includes(n));
  }
  onChangeOfEmployeeSelect(event) {
    this.selectedEmployeeId = parseInt(event.target.value, 10);
    console.log(" this.selectedEmployeeId", this.selectedEmployeeId);
    this.getEmployeDetailsById(this.selectedEmployeeId);
  }
  getEmployeDetailsById(id) {
    this.employeeDetails = this.employees.filter(emp => emp.id === id)[0];
    console.log(" this.employeeDetails", this.employeeDetails);
    this.setState({
      empAllocation: this.employeeDetails.allocation
    });
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
      }
    }
    this.setState({
      [propertyName]: propertyValue
    });
  }
  onSubmitOfEmployeeForm(event) {
    event.preventDefault();

    this.projects.forEach(project => {
      if (project.id === parseInt(this.projectId)) {

        this.employee = this.employeeDetails;
        this.employee.allocation = this.employeeDetails.allocation +  parseInt(this.state.projectAllocation);
        this.employees.forEach(emp => {
          if (emp.id === this.selectedEmployeeId) {
            emp.allocation = this.employee.allocation;
          }
        });
        this.employee.projectAllocation = parseInt(
          this.state.projectAllocation
        );
        this.employee.startDate = this.state.startDate;
        this.employee.endDate = this.state.endDate;
        if (this.state.projectAllocation > 0) {
          project.employees.push(this.employee);
        }
      }
    });

    sessionStorage.setItem("projects", JSON.stringify(this.projects));
    sessionStorage.setItem("employees", JSON.stringify(this.employees));
    this.props.history.push("/");
  }
  render() {
    return (
      <div className="card">
        <main className="my-form">
          <div className="cotainer">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="card">
                  <div className="card-header">Register</div>
                  <div className="card-body">
                    <form
                      name="my-form"
                      onSubmit={this.onSubmitOfEmployeeForm}
                      action="success.php"
                      method=""
                    >
                      <div className="form-group row">
                        <label className="col-md-4 col-form-label text-md-right">
                          Employee Name :
                        </label>
                        <div className="col-md-6">
                          <select
                            className="form-control"
                            onChange={this.onChangeOfEmployeeSelect}
                            name="employeeName"
                            id="employee_name"
                            
                          >
                            <option>--Select Employee--</option>
                            {this.employees.map(emp => (
                              <option key={emp.id} value={emp.id}>
                                {emp.fullName}
                              </option>
                            ))}
                          </select>
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
                            value={this.employeeDetails.id}
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
                            className="form-control"
                            type="date"
                            id="startdate"
                            name="startDate"
                            value={this.state.startDate}
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
                          <span>
                            employee {this.state.empAllocation} % is allocated
                            for other project 
                          </span>
                        </div>
                      </div>

                      <div className="col-md-6 offset-md-4">
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default EmployeeAdd;
