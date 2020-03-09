import React from "react";
import "./App.css";
import { Link} from "react-router-dom";
import RouterComponet from "./RouterComponet";
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
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
                      <Link to={`/component/EmployeeList`}>
                        Show Allocation
                      </Link>
                    </li>
                    <li>
                      <Link to={`/component/EmployeeAdd`}>Add Employee</Link>
                    </li>

                    <li>
                      <Link to={`/employee/HighChart/`}>Show Statistics</Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="col-sm-10">
                <div className=" view-port-height">
                  <div className="">
                    <RouterComponet></RouterComponet>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      // <div className="container-fluid mt-2 ">
      //   <div className="card">
      //     <div className="card-header">Header</div>
      //     <div className="card-body view-port-height">
      //       <nav>
      //         <ul>
      //           <li>
      //             <a href="default.asp">Home</a>
      //           </li>
      //           <li>
      //             <a href="news.asp">News</a>
      //           </li>
      //           <li>
      //             <a href="contact.asp">Contact</a>
      //           </li>
      //           <li>
      //             <a href="about.asp">About</a>
      //           </li>
      //         </ul>
      //       </nav>
      //       Body
      //     </div>
      //     <div className="card-footer">Footer</div>
      //   </div>
      // </div>
    );
  }
}

export default  App;
