import React from "react";
import   './Employee.css'
import * as Highcharts from "highcharts";
class HighChart extends React.Component {
  instance;
  instance1;

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
      categories: ["L1", "L2"],
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
    series: [
     
    ]
  };

  constructor(props) {
    super(props);
    this.state = {
      projectData: [],
      series: [
        {
          name: "ABC",
          data: []
        },
        {
          name: "XYZ",
          data: []
        },
        {
          name: "PCYC",
          data: []
        }
      ],
      seriesForJobLevel: [
        {
          name: "ABC",
          data: []
        },
        {
          name: "PQR",
          data: []
        },
        {
          name: "PCYC",
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
    this.employees = JSON.parse(sessionStorage.getItem("employees"));
    this.projects = JSON.parse(sessionStorage.getItem("projects"));

    if (this.projects.length > 0) {
      var seriesForProjectEmp = [
        {
          colorByPoint: true,
          size: "100%",
          innerSize: "60%",
          data: this.projects.map(function(obj) {
            return { name: obj.name, y: obj.employees.length };
          })
        }
      ];
      console.log("series data", seriesForProjectEmp[0].data);
      this.optionsForProjectEmp.series[0].data = seriesForProjectEmp[0].data;

      for (var index in this.projects) {
        var jobLevelL1cnt = 0;
        var jobLevelL2cnt= 0;
        this.projects[index].employees.map((emp, index) => {
          if (emp.jobLevel ==="L1") {
            jobLevelL1cnt = jobLevelL1cnt + 1;
          } else if (emp.jobLevel ==="L2") {
            jobLevelL2cnt = jobLevelL2cnt + 1;
          }
        });
        this.state.seriesForJobLevel[index].data.push(jobLevelL1cnt);
        this.state.seriesForJobLevel[index].data.push(jobLevelL2cnt);
      }

      console.log("joblevel", this.state.seriesForJobLevel);
       this.optionsForProjectEmpJobLevel.series = this.state.seriesForJobLevel;
    }

    console.log("after options.series", this.optionsForProjectEmp.series);
  }

  componentDidMount() {
    this.instance = Highcharts.chart("projEmp-id", this.optionsForProjectEmp);
    this.instance1 = Highcharts.chart(
      "projEmpJob-id2",
      this.optionsForProjectEmpJobLevel
    );
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-sm-6" id="projEmp-id" />
          <div className="col-sm-6" id="projEmpJob-id2" />
        </div>
        <div>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={this.goBack}
          >
            Back To Dashboard
          </button>
        </div>
      </div>
    );
  }
}

export default HighChart;
