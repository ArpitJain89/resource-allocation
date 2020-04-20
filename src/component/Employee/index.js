import React from "react";
// import "./Employee.css";
import Select from "react-select";
import EmployeeList from "./EmployeeList";
import EmployeeUpdate from "./EmployeeUpdate";
import EmployeeAdd from "./EmployeeAdd";
// import { EmployeeConsumer } from "../context/EmployeeContext";
import { EmployeeConsumer } from "../../context/EmployeeContext";
import moment from "moment";

class Employee extends React.Component {
  selectedProjectEmployees = [];
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: new Date(),
      endDate: new Date(),
      testdate: new Date(),

      resourceData: {
        employees: [],
        projects: []
      },
      selectedProjectEmployees: [],
      employee: {},
      show: "list",
      errors: {},
      selectedOption: null
    };
  }

  submitFromList(e) {
    e.preventDefault();
    if (this.validateForm()) {
      const { employee } = { ...this.state };
      if (this.state.show !== "edit") {
        this.selectedProjectEmployees = [
          ...this.state.selectedProjectEmployees,
          employee
        ];
        this.projects = this.state.projects.map(x => {
          if (x.id === this.projectId) {
            x.employees = this.selectedProjectEmployees;
          }
          return x;
        });
      } else {
        this.selectedProjectEmployees = this.state.selectedProjectEmployees.map(
          x => {
            if (x.id === employee.id) {
              return employee;
            }
            return x;
          }
        );
      }
      // eslint-disable-next-line react/no-direct-mutation-state
      this.state.resourceData.employees = this.state.employees;
      // eslint-disable-next-line react/no-direct-mutation-state
      this.state.resourceData.projects = this.state.projects;
      this.update = true;
      this.setState({
        ...this.state.resourceData,
        selectedProjectEmployees: this.selectedProjectEmployees,
        show: "list"
      });
    }
  }

  getSelectedproject(obj) {
    this.projectId = obj.id;
    this.selectedProjectEmployees = obj.employees;
    this.projectName = obj.name;
  }

  getSelectedEmployee(employee) {
    this.setState({
      employee,
      selectedOption: this.selectedOption,
      errors: {}
    });
  }
  datePickervalidation(value, id) {
    const date = moment(value);
    if (id === "startDate") {
      this.setState({
        selectedValue: date.format("DD-MM-YYYY"),
        testdate: value,
        employee: {
          ...this.state.employee,
          [id]: date.format("DD-MM-YYYY")
        }
      });
    } else {
      const date = moment(value);
      this.setState({
        endDate: date.format("DD-MM-YYYY"),
        testdate: value,
               employee: {
          ...this.state.employee,
          [id]: date.format("DD-MM-YYYY")
        }
      });
    }
  }


  onChangeOfEmployeeForm(event) {
    
    
    let propertyName = event.target.name;
    let propertyValue = event.target.value;
    if (propertyName === "projectAllocation") {
      const allocation = parseInt(propertyValue, 10);
      const freeAllocation = 100 - this.state.employee.allocation;
      if (allocation > freeAllocation) {
        return;
      } else {
        propertyValue = parseInt(propertyValue);
      }
    }
    this.setState({
      employee: {
        ...this.state.employee,
        [propertyName]: propertyValue
      },
      errors: {}
    });
  }

  validateForm() {
    let fields = this.state.employee;
    const { errors } = this.state;

    let formIsValid = true;
    if (!fields["fullName"]) {
      formIsValid = false;
      errors["name"] = " *Please Select Employee Name";
    }
    if (!fields["startDate"]) {
      formIsValid = false;
      errors["startDate"] = "*Please enter StartDate.";
    }
    if (!fields["endDate"]) {
      formIsValid = false;
      errors["endDate"] = "*Please enter EndDate.";
    }
    if (!fields["projectAllocation"]) {
      formIsValid = false;
      errors["projectAllocation"] = "*Please enter Project Allocation.";
    }
    this.setState({
      errors: this.state.errors
    });
    return formIsValid;
  }
  cancelEvent = () => {
    this.setState({ show: "list", errors: {} });
  };

  componentDidMount() {
    this.resourceData = JSON.parse(this.resourceData);
    const { employees, projects } = this.resourceData;
    this.setState({
      resourceData: this.resourceData,
      employees,
      projects
    });
  }
  render() {
    const data = [
      this.state.employees,
      this.state.employee,
      this.state.selectedOption,
      this.projectName,
      this.state.errors,
      this.state.selectedValue,
      this.state.endDate,
      this.state.testdate
    ];

    return (
      <div>
        <div>
          <EmployeeConsumer>
            {value => {
              this.resourceData = JSON.stringify(value.data);
              // eslint-disable-next-line no-lone-blocks
              {
                this.state.update === true ||
                  value.changeData(this.state.resourceData);
              }
            }}
          </EmployeeConsumer>
        </div>

        {this.state.show === "list" ? (
          <div>
            <div className="row">
              <div className="col-3 thead-light font-weight-bold ">
                <label>Project Name : {this.projectName}</label>
              </div>
              <div className="col-3 ">
                <Select
                  className="react-selectcomponent"
                  value={
                    this.state.selectedOption
                      ? this.state.selectedOption
                      : this.selectedOption
                  }
                  onChange={id => {
                    this.getSelectedproject(id);
                  }}
                  getOptionLabel={option => `${option.name}`}
                  options={this.state.projects}
                />
              </div>
              <div className="col-3">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    this.setState({
                      selectedProjectEmployees: this.selectedProjectEmployees,
                      selectedOption: this.selectedOption
                    });
                  }}
                >
                  Show Allocation
                </button>
              </div>
              <div className="col-3">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    this.setState({ show: "add", employee: {} });
                  }}
                >
                  Add Employee
                </button>
              </div>
            </div>

            <EmployeeList
              selectedProjectEmployees={this.state.selectedProjectEmployees}
              upDateEmployee={(employee, show) => {
                this.setState({
                  show,
                  employee
                });
              }}
            />
          </div>
        ) : (
          <div>
            {this.state.show === "edit" ? (
              <EmployeeUpdate
                employee={this.state.employee}
                errors={this.state.errors}
                projectName={this.projectName}
                
                submitFromList={event => {
                  this.submitFromList(event);
                }}
                datePickervalidation={(e, id) => {
                  this.datePickervalidation(e, id);
                }}
                onChangeOfEmployeeForm={e => {
                  this.onChangeOfEmployeeForm(e);
                }}
                cancel={() => {
                  this.cancelEvent();
                }}
              />
            ) : (
              <EmployeeAdd
                data={data}
                datePickervalidation={(e, id) => {
                  this.datePickervalidation(e, id);
                }}
                selectEmployee={emp => {
                  this.getSelectedEmployee(emp);
                }}
                onChangeOfEmployeeForm={e => {
                  this.onChangeOfEmployeeForm(e);
                }}
                submitFromList={event => {
                  this.submitFromList(event);
                }}
                cancel={() => {
                  this.cancelEvent();
                }}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Employee;
