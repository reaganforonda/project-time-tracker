import React from "react";
import axios from "axios";
import ContentAdd from "material-ui/svg-icons/content/add";
import {
  DatePicker,
  TimePicker,
  TextField,
  Dialog,
  RaisedButton,
  FloatingActionButton,
  MenuItem,
  SelectField
} from "material-ui";
import { connect } from "react-redux";

export class EntryForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      startDate: "",
      startTime: "",
      endTime: "",
      duration: 0,
      comment: "",
      jobs: [],
      job: "",
      edit : false
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.handleCancelModalClick = this.handleCancelModalClick.bind(this);
    this.handleTimeSelectStart = this.handleTimeSelectStart.bind(this);
    this.handleTimeSelectEnd = this.handleTimeSelectEnd.bind(this);

    this.calculateDuration = this.calculateDuration.bind(this);
    this.handleResetState = this.handleResetState.bind(this);
    this.handleAddEntry = this.handleAddEntry.bind(this);
    this.getAllJobs = this.getAllJobs.bind(this);
    this.hanldeJobSelect = this.hanldeJobSelect.bind(this);
    this.handleAddEntry = this.handleAddEntry.bind(this);
    this.handleRounding = this.handleRounding.bind(this);
  }

  componentDidMount() {
    this.getAllJobs();
  }

  handleTextChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleDateChange(e, date) {

    this.setState({ startDate: this.formatDate(date) });
  }

  handleOpenModal() {
    this.setState({ modalOpen: true });
  }

  handleTimeSelectStart(e, date) {
    this.setState({ startTime: date });
  }

  handleTimeSelectEnd(e, date) {
    this.setState({ endTime: date });
  }

  // Formate Datepicker's date to something for useable
  formatDate(date) {
    let formatedDate = `${date.getMonth() +
      1}/${date.getDate()}/${date.getFullYear()}`;

    return formatedDate;
  }

  formatTime(date) {
    let formatedTime = `${date.getHours()}:${date.getMinutes()}`;
    console.log(formatedTime);
    return formatedTime;
  }

  // Calculate duration by converting start time and end time into minutes
  // use ~ ~ to turn text into number by flipping the bits
  calculateDuration() {
    let startInMinutes =
      ~~this.state.startTime.getHours() * 60 +
      ~~this.state.startTime.getMinutes();
    let endInMinutes =
      ~~this.state.endTime.getHours() * 60 + ~~this.state.endTime.getMinutes();
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

  handleCancelModalClick() {
    this.handleResetState();
  }

  handleResetState() {
    this.setState({
      modalOpen: false,
      startDate: "",
      startTime: "",
      endTime: "",
      duration: 0,
      comment: "",
      job: ""
    });
  }

  handleAddEntry() {

    let duration = this.calculateDuration();


    let entry = {
      user_id: this.props.user.user_id,
      job_id: this.state.job.job_id,
      client_id: this.state.job.client_id,
      entry_date: this.state.startDate,
      start_time: this.formatTime(this.state.startTime),
      end_time: this.formatTime(this.state.endTime),
      duration: duration,
      total : this.handleRounding(duration * this.state.job.rate, 2),
      comment: this.state.comment,
      billed: false
    };

    axios
      .post("http://localhost:3005/api/entry/add", entry)
      .then(result => {
        console.log(entry);
      })
      .catch(e => {
        console.log(e);
      });

    this.handleResetState();
  }

  getAllJobs() {
    let userId = this.props.user.user_id;
    axios
      .get(`http://localhost:3005/api/jobs/${userId}`)
      .then(jobs => {
        this.setState({ jobs: jobs.data });
      })
      .catch(e => {
        console.log(`Error: ${e}`);
      });
  }

  hanldeJobSelect = (event, index, value) => {
    this.setState({ job: value });
  };

  handleRounding(number, precision) {
    let shift = function(number, precision) {
      let numArray = ('' + number).split("e");
      return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
    };

    return shift(Math.round(shift(number, +precision)), -precision)
  }

  render() {
    let jobArr = this.state.jobs.map(job => {
      return (
        <MenuItem key={job.job_id} primaryText={job.job_name} value={job} />
      );
    });

    return (
      <div>
        <FloatingActionButton
          onClick={() => this.handleOpenModal()}
          mini={false}
          disabled={false}
        >
          <ContentAdd />
          <Dialog modal={true} open={this.state.modalOpen}>
            <form className="entry-entry-form">
              <SelectField
                hintText="Select Job"
                floatingLabelText="Select Job"
                value={this.state.job}
                onChange={(event, index, value) =>
                  this.hanldeJobSelect(event, index, value)
                }
              >
                {jobArr}
              </SelectField>
              <DatePicker
                onChange={this.handleDateChange}
                autoOk={true}
                name="startDate"
                hintText="Entry Date"
                floatingLabelText="Entry Date"
              />

              <TimePicker
                onChange={this.handleTimeSelectStart}
                floatingLabelText="Entry Start Time"
                hintText="Enty Start Time"
                name="startTime"
              />
              <TimePicker
                onChange={this.handleTimeSelectEnd}
                floatingLabelText="Entry End Time"
                hintText="Enty End Time"
                name="endTime"
              />

              <TextField
                type="text"
                value={this.state.comment}
                onChange={e => this.handleTextChange(e)}
                name="comment"
                hintText="Comment"
                floatingLabelText="Comment"
              />

              <div>
                <RaisedButton
                  label="CANCEL"
                  secondary={true}
                  onClick={() => this.handleCancelModalClick()}
                />

                <RaisedButton
                  onClick={() => this.handleAddEntry()}
                  label="CONFIRM"
                  primary={true}
                />
              </div>
            </form>
          </Dialog>
          <div />
        </FloatingActionButton>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer.user
  };
}

export default connect(mapStateToProps, null)(EntryForm);
