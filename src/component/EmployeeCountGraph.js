import React from "react";
import * as Highcharts from "highcharts";

class EmployeeCountGraph extends React.Component {
  instance;
  optionsForProjectEmp = {
    chart: {
      type: "pie"
    },
    title: {
      text: " Employee Count in Projects"
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.y:1f} </b>"
    },
    plotOptions: {
      pie: {
        cursor: "pointer",
        dataLabels: {
          enabled: false
        },
        showInLegend: true
      }
    },
    series: [
      {
        name: "Employee Count",
        data: []
      }
    ]
  };
 
  
  getEmployeeDetails() {
    this.employees = this.props.resourceData.employees;
    this.projects = this.props.resourceData.projects;

    let seriesForProjectEmp = [
      {
        colorByPoint: true,
        size: "100%",
        innerSize: "60%",
        data: this.projects.map(obj => {
          return { name: obj.name, y: obj.employees.length };
        })
      }
    ];
    this.optionsForProjectEmp.series[0].data = seriesForProjectEmp[0].data;

}

  componentDidMount(){
    this.getEmployeeDetails()
    this.instance = Highcharts.chart("projEmp-id", this.optionsForProjectEmp);
  }

  render() {
    return (
        <div className="col-sm-6" id="projEmp-id" />
    );
  }
}

export default EmployeeCountGraph;
