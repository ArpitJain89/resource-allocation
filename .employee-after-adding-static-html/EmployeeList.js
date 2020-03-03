import React from "react";
import { Link } from "react-router-dom";
class EmployeeList extends React.Component {

  render() {
    return (
      <div className="card">
        <div className="card-header text-center">Resource Allocation</div>
        <div className="card-body view-port-height">
          {/* dropdown form */}
          <div className="row">
            <div className="col-3 offset-md-4">
              <select className="form-control" id="exampleFormControlSelect1">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
            <div className="col-4">
              <button type="button" className="btn btn-primary">
                Show Allocation
              </button>
            </div>
          </div>

          {/* Employee List */}

          <table className="table mt-3">
            <thead className="thead-light">
              <tr>
                <th scope="col">Employee Id</th>
                <th scope="col">Email Id</th>
                <th scope="col">Full Name</th>
                <th scope="col">Job Level</th>
                <th scope="col">Designation</th>
                <th scope="col">Allocation</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>
                  <button type="button" className="btn btn-info">
                    <Link to={`/employee/Employee/${1}`}>Edit</Link>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default EmployeeList;
