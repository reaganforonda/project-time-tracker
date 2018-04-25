import React from "react";
import JobForm from '../JobForm/JobForm';
import Menu from "../Menu/Menu";
import Job from "../Job/Job";
import axios from "axios";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import DatePicker from "material-ui/DatePicker";
import RaisedButton from "material-ui/RaisedButton";
import { withRouter, Link } from "react-router-dom";
import DropMenu from "../DropMenu/DropMenu";

import { getUser, getAllClients } from "../../ducks/reducer";
import { connect } from "react-redux";

export class JobView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: [],
      client: "",
      jobs: [],
      clockedInJob : []

    };

    this.handleAddJobClick = this.handleAddJobClick.bind(this);
    this.handleCancelModalClick = this.handleCancelModalClick.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.formatDate = this.formatDate.bind(this);

    this.handleSelectClients = this.handleSelectClients.bind(this);
    this.getAllActiveJobs = this.getAllActiveJobs.bind(this);
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
    axios
      .get("http://localhost:3005/api/jobs/open")
      .then(jobs => {
        this.setState({ jobs: jobs.data });
      })
      .catch(e => console.log(e));
  }







  render() {





    let { picture, user_name } = this.props.user;

    let allJobs = this.state.jobs.map(job => {
      return (
        <div key={job.job_id}>
          <Job client={job.client_name} name={job.job_name} clockedIn={false}/>
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
          <JobForm/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    clients: state.clients
  };
}

export default connect(mapStateToProps, { getUser, getAllClients })(
  withRouter(JobView)
);
