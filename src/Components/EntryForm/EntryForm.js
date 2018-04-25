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

export default class EntryForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      Duration: 0,
      rate: 0,
      comment: ""
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.handleCancelModalClick = this.handleCancelModalClick.bind(this);
    this.handleTimeSelectStart = this.handleTimeSelectStart.bind(this);
    this.handleTimeSelectEnd = this.handleTimeSelectEnd.bind(this);
  }

  handleTextChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleDateChange(e, date) {
    console.log(date);
    this.setState({ startDate: this.formatDate(date) });
  }

  handleOpenModal() {
    this.setState({ modalOpen: true });
  }

  handleTimeSelectStart(e, date) {
    this.setState({ startTime: this.formatTime(date) });
  }

  handleTimeSelectEnd(e, date) {
    this.setState({ endTime: this.formatTime(date) });
  }

  // Formate Datepicker's date to something for useable
  formatDate(date) {
    let formatedDate = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
    console.log(formatedDate);
    return formatedDate;
  }

  formatTime(date) {
    let formatedTime = `${date.getHours()}:${date.getMinutes()}`;
    console.log(formatedTime)
    return formatedTime;
  }

  handleCancelModalClick() {
    this.setState({
      modalOpen: false,
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      Duration: 0,
      rate: 0,
      comment: ""
    });
  }

  render() {
    return (
      <div>
        <FloatingActionButton
          onClick={() => this.handleOpenModal()}
          mini={false}
          disabled={false}
        >
          <ContentAdd />
          <Dialog modal={true} open={this.state.modalOpen}>
            <form className="job-entry-form">
              <DatePicker
                onChange={this.handleDateChange}
                autoOk={true}
                name="startDate"
                hintText="Entry Start Date"
                floatingLabelText="Entry Start Date"
              />

              <DatePicker
              onChange={this.handleDateChange}
                autoOk={true}
                name="endDate"
                hintText="Entry End Date"
                floatingLabelText="Entry End Date"
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
                type="number"
                value={this.state.hourlyRate}
                onChange={e => this.handleTextChange(e)}
                name="hourlyRate"
                hintText="Hourly Rate"
                floatingLabelText="Hourly Rate"
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

                <RaisedButton label="CONFIRM" primary={true} />
              </div>
            </form>
          </Dialog>
        </FloatingActionButton>
      </div>
    );
  }
}
