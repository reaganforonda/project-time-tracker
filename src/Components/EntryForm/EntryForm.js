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
  SelectField,
} from "material-ui";

export default class EntryForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      startDate: "",
      startTime: "",
      endTime: "",
      duration: 0,
      hourlyRate: 0,
      comment: ""
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.handleCancelModalClick = this.handleCancelModalClick.bind(this);
    this.handleTimeSelectStart = this.handleTimeSelectStart.bind(this);
    this.handleTimeSelectEnd = this.handleTimeSelectEnd.bind(this);

    this.calculateDuration = this.calculateDuration.bind(this);
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
    this.setState({ startTime: date });
  }

  handleTimeSelectEnd(e, date) {
    this.setState({ endTime:date });
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

  // Calculate duration by converting start time and end time into minutes
  // use ~ ~ to turn text into number by flipping the bits
  calculateDuration(){
    let startInMinutes = (~~this.state.startTime.getHours()*60) + (~~this.state.startTime.getMinutes());
    let endInMinutes = (~~this.state.endTime.getHours()*60) + (~~this.state.endTime.getMinutes());
    let duration = 0;

    try {
      if( startInMinutes > endInMinutes) throw "Start Time Can't Be After End Time";
      duration =  (endInMinutes - startInMinutes)/60;
    
    } catch (err) {
      alert(`Error : ${err}`)
    }
    
    console.log(duration);
  }

  handleCancelModalClick() {
    this.setState({
      modalOpen: false,
      startDate: "",
      startTime: "",
      endTime: "",
      Duration: 0,
      hourlyRate: 0,
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
            <form className="entry-entry-form">
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

                <RaisedButton onClick={()=>this.calculateDuration()} label="CONFIRM" primary={true} />
              </div>
            </form>
          </Dialog>
          <div>
            
          </div>
        </FloatingActionButton>
      </div>
    );
  }
}
