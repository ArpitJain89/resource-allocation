import React from "react";
import "./App.css";
import EmployeeList from "./employee/EmployeeList";
import Project from "./employee/Project";
import Employee from "./employee/component/Employee";
import EmployeeAdd from "./employee/component/EmployeeAdd";
import HighChart from "./employee/HighChart";
import { Route } from "react-router";
function RouterComponet() {
  return (
    <div>
      <Route exact path="/" component={Project} />
      <Route exact path="/component/EmployeeList" component={EmployeeList} />
      <Route path="/:projectId/employeeAdd/" component={EmployeeAdd} />
      <Route path="/:projectId/employee/:id" component={Employee} />
      <Route path="/employee/HighChart/" component={HighChart} />
    </div>
  );

};
export default RouterComponet
