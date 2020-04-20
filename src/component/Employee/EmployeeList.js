import React, { memo } from "react";

const EmployeeList = ({ selectedProjectEmployees, upDateEmployee }) => {
  const show = "edit";
  return (
    <div>
      <table className="table mt-3">
        <thead className="thead-light">
          <tr>
            <th>Id</th>
            <th>EmailId</th>
            <th>Name</th>
            <th>jobLevel</th>
            <th>Designation</th>
            <th>Project Allocation</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {selectedProjectEmployees.map((employee, index) => {
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
                    type="button"
                    onClick={() => {
                      upDateEmployee(employee, show);
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            );
          })}
          {selectedProjectEmployees.length ? null : (
            <tr className="text-center">
              <td colSpan="7">No data.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default memo(EmployeeList);
