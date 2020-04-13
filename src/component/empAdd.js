import React, { memo } from "react";
import Select from "react-select";

const empAdd = ({
  data,
  onChangeOfEmployeeForm,
  submitFromList,
  selectEmployee,
  cancel
}) => {
  const [
    employess,
    employee,
    selectedOption,
    projectName,
    errors
  ]= data;

  console.log("employess", employess);
  
  return (
    <div className="row">
      <div className="col-12">
        <form onSubmit={submitFromList}>
          <div className="form-group row">
            <label className="col-md-4 col-form-label text-md-right">
              Project Name :
            </label>
            <div className="col-md-6">
              <input
                type="text"
                id="project_name"
                className="form-control"
                name="projectName"
                value={projectName}
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
                value={selectedOption}
                onChange={selectEmployee}
                getOptionLabel={option => `${option.fullName}`}
                options={employess}
              />
              <div className="text-danger">{ errors.name }</div>
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
                value={employee.id }
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
                value={employee.emailId }
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
                value={employee.jobLevel}
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
                value={employee.designation}
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
                value={employee.startDate }
                onChange={onChangeOfEmployeeForm}
              />
              <div className="text-danger">
                {errors.startDate}
              </div>
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
                value={employee.endDate }
                onChange={onChangeOfEmployeeForm}
              />
              <div className="text-danger">
                { errors.startDate }
              </div>
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
                value={ employee.projectAllocation }
                onChange={onChangeOfEmployeeForm}
              />
              <div className="text-danger">
                { errors.projectAllocation }
              </div>
            </div>
          </div>

          <div className="row col-md-6 offset-md-4 ">
            <button type="submit" className="btn btn-primary mr-1">
              Submit
            </button>
            <button type="submit" className="btn btn-primary" onClick={cancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default memo(empAdd);
