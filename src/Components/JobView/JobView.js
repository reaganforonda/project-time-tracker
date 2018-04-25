import React from "react";
import Menu from "../Menu/Menu";
import Jobs from "../Jobs/Jobs";
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
      modalOpen: false,
      jobName: "",
      jobDescription: "",
      startDate: null,
      hourlyRate: 0,
      clients: [],
      client: ""
    };

    this.handleAddJobClick = this.handleAddJobClick.bind(this);
    this.handleCancelModalClick = this.handleCancelModalClick.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.formatDate = this.formatDate.bind(this);

    this.handleSelectClients = this.handleSelectClients.bind(this);
  }

  componentDidMount() {
    this.props.getUser();
    this.props.getAllClients();
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
    this.setState({ startDate: date });
  }

  handleJobSubmit() {
    // TODO: ALSO BIND THIS THING!!!
  }

  // Formate Datepicker's date to something for useable
  formatDate(date) {
    let formatedDate = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
    return formatedDate;
  }

  handleSelectClients(event, index, value) {
    this.setState({ client: value });
  }

  redirectAlert() {
    alert("Please Login In");
    this.props.history.push("/");
  }

  render() {
    let { picture, user_name } = this.props.user;

    const clients = [
      <MenuItem key={1} value={"dookie"} primaryText="Client 1" />,
      <MenuItem key={2} value={2} primaryText="Client 2" />,
      <MenuItem key={3} value={3} primaryText="Client 3" />,
      <MenuItem key={4} value={4} primaryText="Client 4" />
    ];

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
          </div>
        </div>

        <div className="floating-action">
          <FloatingActionButton
            onClick={() => this.handleAddJobClick()}
            mini={false}
            disabled={false}
          >
            <ContentAdd />

            <Dialog modal={true} open={this.state.modalOpen}>
              <form className="job-entry-form">
                <SelectField
                  onChange={this.handleSelectClients}
                  value={this.state.client}
                  floatingLabelText="Select Client"
                >
                  {clients}
                </SelectField>

                <TextField
                  value={this.state.jobName}
                  onChange={e => this.handleTextChange(e)}
                  name="jobName"
                  hintText="Job Name"
                  floatingLabelText="Job Name"
                />

                <TextField
                  value={this.state.jobDescription}
                  onChange={e => this.handleTextChange(e)}
                  name="jobDescription"
                  hintText="Job Description"
                  floatingLabelText="Job Description"
                />

                <DatePicker
                  autoOk={true}
                  value={this.state.startDate}
                  onChange={this.handleDateChange}
                  name="startDate"
                  hintText="Job Start Date"
                  floatingLabelText="Job Start Date"
                />

                <TextField
                  type="number"
                  value={this.state.hourlyRate}
                  onChange={e => this.handleTextChange(e)}
                  name="hourlyRate"
                  hintText="Hourly Rate"
                  floatingLabelText="Hourly Rate"
                />
                <div>
                  <RaisedButton onClick={() => this.handleCancelModalClick()}>
                    Cancel
                  </RaisedButton>
                  <RaisedButton>Confirm</RaisedButton>
                </div>
              </form>
            </Dialog>
          </FloatingActionButton>
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
