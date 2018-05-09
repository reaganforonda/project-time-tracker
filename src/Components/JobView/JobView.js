import React from "react";
import JobForm from "../JobForm/JobForm";
import Job from "../Job/Job";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  getEnteriesByJobId,
  updateActiveEntry,
  addActiveEntry
} from "../../ducks/entryReducer";
import {
  getClockedInJob,
  getAllActiveJobs,
  getOffTheClockJobs,
  updateStartTime,
  clockOutJob
} from "../../ducks/jobReducer";

import moment from 'moment'

export class JobView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    };

    this.handleAddJobClick = this.handleAddJobClick.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.handleSelectClients = this.handleSelectClients.bind(this);
    this.handleClockIn = this.handleClockIn.bind(this);
    this.handleClockOut = this.handleClockOut.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.getClockTime = this.getClockTime.bind(this);
    this.formatTime = this.formatTime.bind(this);
    this.addNewEntry = this.addNewEntry.bind(this);
  }

  componentDidMount() {
    this.props.getOffTheClockJobs(this.props.user.user_id);
    this.props.getClockedInJob(this.props.user.user_id);
  }

  handleAddJobClick() {
    this.setState({ modalOpen: true });
  }

  handleTextChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleDateChange(e, date) {
    this.setState({ startDate: this.formatDate(date) });
  }

  // Formate Datepicker's date to something more useable
  formatDate(date) {
    let formatedDate = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
    return formatedDate;
  }

  handleSelectClients(event, index, value) {
    this.setState({ client: value });
  }

  handleClockIn(job) {
    axios
      .put(
        `http://localhost:3005/api/jobs/updateclock/${
          this.props.user.user_id
        }/${job.job_id}/true`
      )
      .then(result => {
        console.log(result.data);
        this.props.getClockedInJob(this.props.user.user_id);
        this.props.getOffTheClockJobs(this.props.user.user_id);
      })
      .catch(e => {
        console.log(`Error while trying to Update Job: ${e}`);
      });

    this.addNewEntry(job);
  }

  handleClockOut(job) {
    axios
      .put(
        `http://localhost:3005/api/jobs/updateclock/${
          this.props.user.user_id
        }/${job.job_id}/false`
      )
      .then(result => {
        console.log(result.data);
        this.props.getClockedInJob(this.props.user.user_id);
        this.props.getOffTheClockJobs(this.props.user.user_id);
      })
      .catch(e => {
        console.log(`Error while trying to Update Job: ${e}`);
      });

    this.updateEntry(this.props.activeEntry);
  }

  // Get time as soon as the user hit clock in
  getClockTime() {
    let timestamp = new Date();

    return timestamp;
  }

  formatTime(date) {
    let formatedTime = `${date.getHours()}:${date.getMinutes()}`;
    return formatedTime;
  }

  calculateDuration(endTime) {
    let startInMinutes =
      ~~this.props.clockInTime.getHours() * 60 +
      ~~this.props.clockInTime.getMinutes();
    let endInMinutes = ~~endTime.getHours() * 60 + ~~endTime.getMinutes();
    let duration = 0;

    try {
      if (startInMinutes > endInMinutes)
        throw "Start Time Can't Be After End Time";
      duration = (endInMinutes - startInMinutes) / 60;
    } catch (err) {
      alert(`Error : ${err}`);
    }

    return duration;
  }

  addNewEntry(job) {
    let time = this.getClockTime();
    this.props.updateStartTime(time);
    let entry_date = this.formatDate(time);
    let start_time = this.formatTime(time);
    let entry = {
      user_id: this.props.user.user_id,
      job_id: job.job_id,
      client_id: job.client_id,
      entry_date: entry_date,
      start_time: start_time,
      billed: false
    };

    this.props.addActiveEntry(entry);
  }

  updateEntry(activeEntry) {
    let time = this.getClockTime();
    let end_time = this.formatTime(time);

    let duration = this.calculateDuration(time);
    let total = duration * this.props.jobOnClock.rate;
    let updateEntry = { duration: duration, end_time: end_time, total };

    this.props.updateActiveEntry(
      activeEntry.job_id,
      this.props.user.user_id,
      activeEntry.entry_id,
      updateEntry
    );
  }

  render() {
    let allJobs = this.props.offTheClockJobs.map(job => {
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
              <h1>ON THE CLOCK</h1>
            </div>
            {this.props.jobOnClock ? (
              <Job
                className="on-clock-job"
                job={this.props.jobOnClock}
                clockedIn={true}
                clockOut={this.handleClockOut}
                clientName={this.props.jobOnClock.client_name}
                jobName={this.props.jobOnClock.job_name}
              />
            ) : null}
            <div />
          </div>

          <div className="clock-out-container">
            <div className="clockedOut">
              <h1>OFF THE CLOCK</h1>
            </div>
            {allJobs}
          </div>
        </div>

        <div className="floating-action">
          <JobForm getAllActiveJobs={this.getAllActiveJobs} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
    jobOnClock: state.jobReducer.jobOnClock,
    offTheClockJobs: state.jobReducer.offTheClockJobs,
    clients: state.clientReducer.clients,
    clockInTime: state.jobReducer.clockInTime,
    activeEntry: state.entryReducer.activeEntry
  };
}

export default connect(mapStateToProps, {
  getEnteriesByJobId,
  getAllActiveJobs,
  getOffTheClockJobs,
  getClockedInJob,
  updateStartTime,
  updateActiveEntry,
  clockOutJob,
  addActiveEntry
})(withRouter(JobView));
