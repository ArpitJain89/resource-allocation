import React from "react";
import "./App.css";
import EmployeeList from "./employee/EmployeeList";
import Employee from "./employee/Employee";
import EmployeeAdd from "./employee/EmployeeAdd";
import HighChart from "./employee/HighChart";
import {  Route } from "react-router";
import { BrowserRouter } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid mt-2">
        <BrowserRouter>
          <Route exact path="/" component={EmployeeList} />
          <Route path="/:projectId/employeeAdd/" component={EmployeeAdd} />
          <Route path="/:projectId/employee/:id" component={Employee} />
          <Route path="/employee/HighChart/" component={HighChart} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
