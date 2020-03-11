import React from "react";
const resourceData = require("../assets/employees.json");
function Project()  {
        return (
          <div>
            <table className="table mt-3">
              <thead className="thead-light ">
                <tr>
                  <th scope="col">Project Id</th>
                  <th scope="col">Project Name</th>
                  <th scope="col">Client Name</th>
                  <th scope="col">Unit</th>
                  <th scope="col">Manager Name</th>
                </tr>
              </thead>
              <tbody>
                {resourceData.projects.map((project, index) => {
                  return (
                    <tr key={index}>
                      <td> {project.id}</td>
                      <td> {project.name}</td>
                      <td> {project.clientName}</td>
                      <td> {project.unit}</td>
                      <td> {project.managerName}</td>
                    </tr>
                  );
                })}

                {resourceData.projects ? null : (
                  <tr className="text-center">
                    <td colSpan="7">No data.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        );
}
export default Project