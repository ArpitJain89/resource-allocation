import React from "react";
import "./App.css";
import EmployeeList from "./component/EmployeeList";
// import Employee from "./component/Employee";

import Project from "./component/Project";
import EmployeeEdit from "./component/EmployeeEdit";
import EmployeeAdd from "./component/EmployeeAdd";
import HighChart from "./component/HighChart";
import { Route } from "react-router";
function RouterComponet() {
  return (
    <div>
      <Route exact path="/" component={HighChart} />
      <Route exact path="/component/EmployeeList" component={EmployeeList} />
      <Route path="/component/Project" component={Project} />
    </div>
  );

};
export default RouterComponet
