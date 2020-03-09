import React from "react";
import "./Employee.css";
import * as Highcharts from "highcharts";
const resourceData = require("../assets/employees.json");
class HighChart extends React.Component {
  instance;
  instance1;
  jobLevelL1cnt = 0;
  jobLevelL2cnt = 0;
  jobLevelL3cnt = 0;

  optionsForProjectEmp = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie"
    },
    title: {
      text: "Projects Vs Employee Count"
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.y:1f} </b>"
    },

    plotOptions: {
      pie: {
        allowPointSelect: true,
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
        colorByPoint: true,
        data: []
      }
    ]
  };
  optionsForProjectEmpJobLevel = {
    chart: {
      type: "column"
    },
    title: {
      text: "Projects Vs Employee Job Level"
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

  constructor(props) {
    super(props);
    this.state = {
      seriesForJobLevel: [
        {
          name: "Harman",
          data: []
        },
        {
          name: "Bajaj",
          data: []
        },
        {
          name: "PCYC",
          data: []
        },
        {
          name: "Ideas to Impacts",
          data: []
        },
        {
          name: "Syntel",
          data: []
        }
      ]
    };
    this.goBack = this.goBack.bind(this);
  }
  goBack() {
    this.props.history.push("/");
  }

  componentWillMount() {
    this.getEmployeeDetails();
  }
  getEmployeeDetails() {
    this.employees = resourceData.employees;
    this.projects = resourceData.projects;

    let seriesForProjectEmp = [
      {
        colorByPoint: true,
        size: "100%",
        innerSize: "60%",
        data: this.projects.map(obj=> {
          return { name: obj.name, y: obj.employees.length };
        })
      }
    ];
    this.optionsForProjectEmp.series[0].data = seriesForProjectEmp[0].data;

    for (let index in this.projects) {
      this.projects[index].employees.map(emp => {
        if (emp.jobLevel === "L1") {
          this.jobLevelL1cnt = this.jobLevelL1cnt + 1;
        } else if (emp.jobLevel === "L2") {
          this.jobLevelL2cnt = this.jobLevelL2cnt + 1;
        } else {
          this.jobLevelL3cnt = this.jobLevelL3cnt + 1;
        }
      });
      this.state.seriesForJobLevel[index].data.push(this.jobLevelL1cnt);
      this.state.seriesForJobLevel[index].data.push(this.jobLevelL2cnt);
      this.state.seriesForJobLevel[index].data.push(this.jobLevelL3cnt);
    }
    this.optionsForProjectEmpJobLevel.series = this.state.seriesForJobLevel;
  }

  componentDidMount() {
    this.instance = Highcharts.chart("projEmp-id", this.optionsForProjectEmp);
    this.instance1 = Highcharts.chart( "projEmpJob-id2", this.optionsForProjectEmpJobLevel);
  }

  render() {
    return (
      <div className="row">

        <div className="col-sm-6" id="projEmp-id" />
        <div className="col-sm-6" id="projEmpJob-id2" />
      </div>
    );
  }
}

export default HighChart;
