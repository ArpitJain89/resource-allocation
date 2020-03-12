import React from "react";
import "./App.css";
import { Link } from "react-router-dom";
import RouterComponet from "./RouterComponet";
function App() {
  return (
    <div className="custom-section">
      <div className="card">
        <div className="card-header text-center font-weight-bolder">
          <span>Resource Allocation</span>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-sm-2">
              <nav className="navbar navbar-default">
                <ul className="nav navbar-nav">
                  <li>
                    <Link to={`/`}>Dashboard</Link>
                  </li>
                  <li>
                    <Link to={`/component/EmployeeList`}>Show Allocation</Link>
                  </li>
                  {/* <li>
                    <Link to={`/component/EmployeeAdd`}>Add Employee</Link>
                  </li> */}

                  <li>
                    <Link to={`/component/Project`}>Show Project</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-sm-10">
              <div className=" view-port-height">
                <RouterComponet></RouterComponet>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
