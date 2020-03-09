import React from "react";
import Select from "react-select";
import "../Employee.css";
// import employee from "../../assets/employees.json"
const resourceData = require("../../assets/employees.json");

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
      selectedOption:null,
      projectAllocation: 0,
      empAllocation: 0,
      startDate: new Date(),
      endDate: new Date()
    };
    this.onChangeOfEmployeeForm = this.onChangeOfEmployeeForm.bind(this);
  }
  componentWillMount() {
    this.getEmployeDetails();
  }

  getEmployeDetails() {
   this.employees = resourceData.employees 
    this.projects = resourceData.projects  
      // sessionStorage.getItem("projects")
  
    this.employees = this.employees.filter(emp => emp.allocation != 100);
  }

  onChangeOfEmployeeForm(event) {
    let propertyName = event.target.name;
    let propertyValue = event.target.value;
    if (propertyName === "projectAllocation") {
      const allocation = parseInt(propertyValue, 10);
      const freeAllocation = 100 - this.employeeDetails.allocation;
      if (allocation > freeAllocation) {
        return;
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
        this.employee.allocation =
          this.employeeDetails.allocation +
          parseInt(this.state.projectAllocation);
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
  goBack() {
    this.props.history.push("/");
  }

  handleChange(val) {
    this.setState({ selectedOption: val.projectName });
    const  selectedEmployeeId = parseInt(val.id, 10);
   if (val.fullName) {
     this.employeeDetails = this.employees.filter(
       emp => emp.id === selectedEmployeeId
     )[0];

   }
    
  }
  render() {
    return (
      <div>
        <form
          name="my-form"
          onSubmit={this.onSubmitOfEmployeeForm.bind(this)}
          action="success.php"
          method=""
        >
          <div className="form-group row">
            <label className="col-md-4 col-form-label text-md-right">
              Project Name :
            </label>
            <div className="col-md-6">
             

              <Select
                className="react-selectcomponent"
                value={this.state.selectedOption}
                onChange={this.handleChange.bind(this)}
                getOptionLabel={option => `${option.name}`}
                options={this.projects}
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
                style={{
                  boxShadow: "none"
                }}
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
                employee {this.employeeDetails.allocation} % is allocated for
                other project
              </span>
            </div>
          </div>

          <div className="col-md-6 offset-md-4">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button
              type="button"
              className="btn btn-primary"
              style={{ margin: "5px" }}
              onClick={this.goBack.bind(this)}
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
