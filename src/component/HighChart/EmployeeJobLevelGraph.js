import React from "react";
import * as Highcharts from "highcharts";

class EmployeeJobLevelGraph extends React.Component {
  instance;
  jobLevelL1cnt = 0;
  jobLevelL2cnt = 0;
  jobLevelL3cnt = 0;

  optionsForProjectEmpJobLevel = {
    chart: {
      type: "column"
    },
    title: {
      text: "Employee Job Level in Projects"
    },
    xAxis: {
      categories: ["L1", "L2", "L3"],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: "Job Level"
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:1f} </b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: []
  };

  getEmployeeDetails() {
    this.employees = this.props.resourceData.employees;
    this.projects = this.props.resourceData.projects;

    let seriesForJobLevel = this.projects.map(obj => {
      return { name: obj.name, data: [] };
    });

    for (let index in this.projects) {
      this.jobLevelL1cnt = 0;
      this.jobLevelL2cnt = 0;
      this.jobLevelL3cnt = 0;
      this.projects[index].employees.map(emp => {
        if (emp.jobLevel === "L1") {
          return (this.jobLevelL1cnt = this.jobLevelL1cnt + 1);
        } else if (emp.jobLevel === "L2") {
          return (this.jobLevelL2cnt = this.jobLevelL2cnt + 1);
        } else {
          return (this.jobLevelL3cnt = this.jobLevelL3cnt + 1);
        }
      });
      seriesForJobLevel[index].data.push(this.jobLevelL1cnt);
      seriesForJobLevel[index].data.push(this.jobLevelL2cnt);
      seriesForJobLevel[index].data.push(this.jobLevelL3cnt);
    }
    this.optionsForProjectEmpJobLevel.series = seriesForJobLevel;
  }

  componentDidMount() {
    this.getEmployeeDetails();
    this.instance = Highcharts.chart(
      "projEmpJob-id2",
      this.optionsForProjectEmpJobLevel
    );
  }

  render() {
    return <div className="col-sm-6" id="projEmpJob-id2" />;
  }
}

export default EmployeeJobLevelGraph;
