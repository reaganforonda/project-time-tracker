import React from "react";
import { connect } from "react-redux";
import { Doughnut, Bar } from "react-chartjs-2";
import { Paper } from "material-ui";
import numeral from "numeral";
import { withRouter } from "react-router-dom";
import {
  getInProgressCount,
  getInProgressTotals,
  getTotalsClient,
  getRevMonthly,
  getHrsMonthly
} from "../../ducks/analyticsReducer";

export class Analytics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSet1: {}
    };

    this.createDoughnutDataSet1 = this.createDoughnutDataSet1.bind(this);
  }
  componentDidMount() {
    this.props.getInProgressCount(this.props.user.user_id);
    this.props.getInProgressTotals(this.props.user.user_id);
    this.props.getTotalsClient(this.props.user.user_id);
    this.props.getHrsMonthly(this.props.user.user_id);
    this.props.getRevMonthly(this.props.user.user_id);
  }

  createDoughnutDataSet1(data, label) {
    let dataSet = {
      datasets: [
        {
          data: data
        }
      ],

      label: label
    };

    console.log(dataSet);

    this.setState({ dataSet1: dataSet });
  }

  generateRandomcColors(numOfColors) {
    let colors = [];
    let counter = 0;

    while (counter < numOfColors) {
      let r = Math.floor(Math.random() * 255);
      let g = Math.floor(Math.random() * 255);
      let b = Math.floor(Math.random() * 255);
      let color = `rgb(${r}, ${b}, ${b})`;
      colors.push(color);
      counter += 1;
    }

    return colors;
  }

  render() {
    //   Doughnut 1 Data Set
    let data = this.props.totalsClient.map(value => {
      return value.total_revenue;
    });

    let label = this.props.totalsClient.map(value => {
      return value.client_name;
    });
    let dataSet1 = {
      datasets: [
        {
          data: data,
          backgroundColor: this.generateRandomcColors(data.length)
        }
      ],
      labels: label
    };

    let optionsDataSet1 = {
      responsive: true,
      title: {
        display: true,
        position: "top",
        text: "TOTAL REVENUE",
        fontSize: 20,
        fontColor: "#EB7F00"
      }
    };

    //   Doughnut 2 Data Set
    let data2 = this.props.totalsClient.map(value => {
      return value.total_hrs;
    });

    let label2 = this.props.totalsClient.map(value => {
      return value.client_name;
    });
    let dataSet2 = {
      datasets: [
        {
          data: data2,
          backgroundColor: this.generateRandomcColors(data.length)
        }
      ],
      labels: label2
    };
    let optionsDataSet2 = {
      responsive: true,
      title: {
        display: true,
        position: "top",
        text: "TOTAL HOURS",
        fontSize: 25,
        fontColor: "#EB7F00"
      }
    };

    // BarChart Data Set 1
    let barData1 = this.props.hrsMonthly.map(value => {
      return value.total;
    });

    let barLabel = this.props.hrsMonthly.map(value => {
      return `${value.month}`;
    });

    let barDataSet1 = {
      datasets: [
        {
          data: barData1,
          backgroundColor: this.generateRandomcColors(data.length)
        }
      ],
      labels: barLabel
    };

    let optionsBarSet1 = {
      responsive: true,
      title: {
        display: true,
        position: "top",
        text: "MONTHLY HOURS",
        fontSize: 25,
        fontColor: "#EB7F00"
      },
      legend : {display : false}
    };

    // BarChart Data Set 2
    let barData2 = this.props.revMonthly.map(value => {
      return value.total;
    });

    let barLabel2 = this.props.revMonthly.map(value => {
      return `${value.month}`;
    });

    let barDataSet2 = {
      datasets: [
        {
          data: barData2,
          backgroundColor: this.generateRandomcColors(data.length)
        }
      ],
      labels: barLabel2
    };

    let optionsBarSet2 = {
      responsive: true,
      title: {
        display: true,
        position: "top",
        text: "MONTHLY REVENUE",
        fontSize: 25,
        fontColor: "#EB7F00"
      },
      legend : {display : false},
      scales : {
          yAxes : [{
              ticks : {
                  callback : function (value, index, values) {
                      return '$' + value;
                  }
              }
          }]
      }
    };

    return (
      <div>
        {!this.props.user.user_id ? (
          this.props.history.push("/")
        ) : (
          <div className="jobs-in-progress">
            <Paper zDepth={3} style={{backgroundColor: '#6B6E70', display:'flex', justifyContent:'space-between', alignItems:'center', paddingLeft:'5%', paddingRight:'5%', height:'10vh'}}>
              <h1 style={{display : 'flex', alignItems:'center', color: 'white'}}>
              <div style={{marginRight:'30px'}}>IN PROGRESS JOBS</div>
                <span className="progress-count">
                  {numeral(this.props.inProgressCount).format("0,0")}
                </span>
              </h1>
              <h1 style={{display : 'flex', alignItems:'center', color: 'white'}}>
              <div style={{marginRight:'30px'}}>IN PROGRESS HOURS</div>
                <span className="progress-hrs">
                  {numeral(this.props.inProgressTotals.total_hrs).format(
                    "0,0.0"
                  )}
                </span>
              </h1>
              <h1 style={{display : 'flex', alignItems:'center', color: 'white'}}>
                <div style={{marginRight:'30px'}}>IN PROGRESS REVENUE</div>
                <span className="progress-count">
                  {numeral(this.props.inProgressTotals.total_rev).format(
                    "$0,0.00"
                  )}
                </span>
              </h1>
            </Paper>
            <hr className='analytics-hr'/>
            <div className='chart-section-1'>
              <Paper>
                <Doughnut data={dataSet1} options={optionsDataSet1} />
              </Paper>

              <Paper>
                <Doughnut data={dataSet2} options={optionsDataSet2} />
              </Paper>
            </div>
            <div className='chart-section-2'>
              <Paper>
                <Bar data={barDataSet1} options={optionsBarSet1} />
              </Paper>
              <Paper>
                <Bar data={barDataSet2} options={optionsBarSet2} />
              </Paper>
            </div>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
    inProgressCount: state.analyticsReducer.inProgressCount,
    inProgressTotals: state.analyticsReducer.inProgressTotals,
    totalsClient: state.analyticsReducer.totalsClient,
    hrsMonthly: state.analyticsReducer.hrsMonthly,
    revMonthly: state.analyticsReducer.revMonthly
  };
}

export default connect(mapStateToProps, {
  getInProgressCount,
  getInProgressTotals,
  getTotalsClient,
  getRevMonthly,
  getHrsMonthly
})(withRouter(Analytics));
