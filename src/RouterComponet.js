import React from "react";
import  EmployeeList  from "./component/Employee/index";
import Project from "./component/Project/index";
import HighChart from "./component/HighChart/index";
import { Route, Switch } from "react-router";
function RouterComponet() {
  return (
    <Switch>
      <Route exact path="/" component={HighChart} />
      <Route exact path="/Component/Employee" component={EmployeeList} />
      <Route path="/component/Project" component={Project} />
    </Switch>
  );

};
export default RouterComponet
