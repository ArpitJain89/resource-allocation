import React from "react";
import { Link } from "react-router-dom";

class Employee extends React.Component {
  render() {
    return (
      <div className="card">
        <div className="card-header text-center">Resource Allocation</div>
        <div className="card-body view-port-height">
          <div className="row">
            <div className="col">
              <button type="button" className="btn btn-info">
                <Link to={``}>Back</Link>
              </button>
            </div>
          </div>

          {/* onSubmit={this.goBack} */}

          <form>
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input
                type="date"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group">
              <label>Allocation</label>
              <input
                type="number"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Employee;
