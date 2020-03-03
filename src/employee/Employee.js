import React from "react";

class Employee extends React.Component {
  employeeDetails = {};
  projects=[];
  selectedEmployees;
  projectId;
  empAllocation=0;
  allocationCheckForValidation;

  constructor(props) {
    super(props);

    this.state = {
      projectAllocation: 0,
      startDate: "",
      endDate: "",
      projectId:'',

    };
    this.validationForm = {
      projectAllocation: ""
    };
    this.onChangeOfEmployeeForm = this.onChangeOfEmployeeForm.bind(this);
    this.onSubmitOfEmployeeForm = this.onSubmitOfEmployeeForm.bind(this);
    this.projectId=this.props.match.params.projectId;
    this.getEmployeDetails(
      this.props.match.params.projectId,
      this.props.match.params.id
    );
  }


  /**
   * This function is used to get selected employee
   * @param {Number} projectId
   * @param {Number} employeeId
   */
  getEmployeDetails(projectId, employeeId) {
    if (sessionStorage.getItem("projects")) {
      this.projects = JSON.parse(sessionStorage.getItem("projects"));

      // get selected project
      const selectedprojects = this.projects.filter(
        project => project.id === parseInt(projectId, 10)
      );

      // get empployees of selected project
      const employees = selectedprojects.length
        ? selectedprojects[0].employees
        : [];

      // get specific selected employees
        this.selectedEmployees = employees.filter(
        employee => employee.id === parseInt(employeeId, 10)
      );

      this.employeeDetails = this.selectedEmployees.length
        ? this.selectedEmployees[0]
        : {};

      this.state.projectAllocation = this.employeeDetails.projectAllocation;
      this.state.startDate = this.employeeDetails.startDate;
      this.state.endDate = this.employeeDetails.endDate;
      this.allocationCheckForValidation = this.employeeDetails.allocation;
    }
  }

  onChangeOfEmployeeForm(event) {
    let propertyName = event.target.name;
    let propertyValue = event.target.value;

    if (propertyName === "projectAllocation") {
      const allocation = parseInt(propertyValue, 10);
      const freeAllocation = 100 - this.employeeDetails.allocation;
      if (allocation > freeAllocation + this.employeeDetails.projectAllocation ) 
      {
        return;
      } 
      else {
        
      }
    }
    this.setState({
      [propertyName]: propertyValue
    });
  }

  onSubmitOfEmployeeForm(event) {
    event.preventDefault();
    /**
     * Get the employee array and project array
     * 1. check for employee array-> Update the employee with uodated values
     * 2. check project array -> if it this employee exist in that project then update the employee with updated values.
     * 3. redirect to the list
     */

    //allocation update in employee array
    const employees = JSON.parse(sessionStorage.getItem("employees"));
    const updatedAllocation = parseInt(this.state.projectAllocation);
    employees.forEach(employee => {
      if (employee.id === this.employeeDetails.id) {
        if (employee.allocation > updatedAllocation) {
          employee.allocation =  employee.allocation - (this.selectedEmployees[0].projectAllocation - updatedAllocation);
          this.empAllocation = employee.allocation; ;
        } else {
          employee.allocation = employee.allocation + (updatedAllocation - this.selectedEmployees[0].projectAllocation );
           this.empAllocation = employee.allocation; 
        }
      }
    });
   // allocation update in project  selectedEmployees
   this.projects.forEach(project =>{
        project.employees.forEach(emp=> {
          if(emp.id===this.employeeDetails.id){
            if (project.id ===parseInt(this.projectId)) {
              emp.projectAllocation = updatedAllocation;
              emp.startDate=this.state.startDate;
              emp.endDate=this.state.endDate
            }
            
            emp.allocation=this.empAllocation;
          }
        });
      
    //  }
    });
   
    sessionStorage.setItem("employees", JSON.stringify(employees));
    sessionStorage.setItem("projects", JSON.stringify(this.projects));
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
                  <div className="card-header">Update Employee</div>
                  <div className="card-body">
                    <form
                      name="my-form"
                      onSubmit={this.onSubmitOfEmployeeForm}
                      action="success.php"
                      method=""
                    >
                      <div className="form-group row">
                        <label className="col-md-4 col-form-label text-md-right">
                          Employee Id :
                        </label>
                        <div className="col-md-6">
                          <input
                            type="text"
                            id="emp_id"
                            className="form-control"
                            name="id"
                            value={this.employeeDetails.id}
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
                            id="emp_id"
                            className="form-control"
                            name="id"
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
                        <button type="submit" className="btn btn-primary">
                         Update
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

export default Employee;
