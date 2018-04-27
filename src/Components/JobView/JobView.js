import React from "react";
import JobForm from "../JobForm/JobForm";
import Job from "../Job/Job";
import axios from "axios";
import ContentAdd from "material-ui/svg-icons/content/add";
import { withRouter, Link } from "react-router-dom";
import {
  RaisedButton,
  DatePicker,
  TextField,
  Dialog,
  FloatingActionButton,
  MenuItem,
  SelectField
} from "material-ui";

import { getUser } from "../../ducks/userReducer";
import { getAllClients } from "../../ducks/clientReducer";
import { updateClockIn } from "../../ducks/jobReducer";

import { connect } from "react-redux";
const _ = require("lodash");

export class JobView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      job: {}
    };

    this.handleAddJobClick = this.handleAddJobClick.bind(this);
    this.handleCancelModalClick = this.handleCancelModalClick.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.formatDate = this.formatDate.bind(this);

    this.handleSelectClients = this.handleSelectClients.bind(this);
    this.getAllActiveJobs = this.getAllActiveJobs.bind(this);
    this.handleClockIn = this.handleClockIn.bind(this);
    this.handleClockOut = this.handleClockOut.bind(this);
  }

  componentDidMount() {
    this.props.getUser();
    this.props.getAllClients();
    this.getAllActiveJobs();
  }

  handleAddJobClick() {
    this.setState({ modalOpen: true });
  }

  handleCancelModalClick() {
    this.setState({
      modalOpen: false,
      jobName: "",
      jobDescription: "",
      startDate: null,
      hourlyRate: 0
    });
  }

  handleTextChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleDateChange(e, date) {
    this.setState({ startDate: this.formatDate(date) });
  }

  handleJobSubmit() {
    // TODO: ALSO BIND THIS THING!!!
  }

  // Formate Datepicker's date to something more useable
  formatDate(date) {
    let formatedDate = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
    return formatedDate;
  }

  handleSelectClients(event, index, value) {
    this.setState({ client: value });
  }

  getAllActiveJobs() {
    let userId = this.props.user.user_id;

    axios
      .get(`http://localhost:3005/api/jobs/open/${userId}`)
      .then(jobs => {
        this.setState({ jobs: jobs.data });
      })
      .catch(e => console.log(e));
  }

  handleClockIn(job) {
    let jobID = job.job_id;

    let temp = [];
    let clockInJob = {};
    if (!this.state.job.job_id) {
      for (var i = 0; i < this.state.jobs.length; i++) {
        if (this.state.jobs[i].job_id === jobID) {
          clockInJob = Object.assign({}, clockInJob, this.state.jobs[i]);
          temp = this.state.jobs.splice(i, 1);
        }
      }

      this.setState({ job: clockInJob });
    }
  }

  handleClockOut(job){
    let temp = Object.assign({},temp, {});
    this.setState({job : temp});

    let tempJobs = this.state.jobs
    tempJobs.push(job);
    console.log(tempJobs)

    this.setState({jobs : tempJobs})
  }

  render() {
    let { picture, user_name } = this.props.user;

    let allJobs = this.state.jobs.map(job => {
      return (
        <div key={job.job_id}>
          <Job
            clientName={job.client_name}
            jobName={job.job_name}
            job={job}
            clockIn={this.handleClockIn}
            clockedIn={false}
          />
        </div>
      );
    });

    return (
      <div>
        <div className="job-container">
          <div className="clock-in-container">
            <div className="clockedIn">
              <h1>On The Clock</h1>
            </div>
            {this.state.job.job_id ? (
              <Job job={this.state.job} clockedIn={true} clockOut={this.handleClockOut} clientName={this.state.job.client_name} jobName={this.state.job.job_name}/>
            ) : null}
            <div />
          </div>

          <div className="clock-out-container">
            <div className="clockedOut">
              <h1>Off The Clock</h1>
            </div>
            {allJobs}
          </div>
        </div>

        <div className="floating-action">
          <JobForm />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
    clients: state.clientReducer.clients
  };
}

export default connect(mapStateToProps, {
  updateClockIn,
  getUser,
  getAllClients
})(withRouter(JobView));
