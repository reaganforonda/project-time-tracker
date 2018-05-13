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
import {getAllEntries} from '../../ducks/entryReducer';
import {getAllActiveJobs} from '../../ducks/jobReducer';

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
      edit: false
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
    this.props.getAllActiveJobs(this.props.user.user_id)
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
      total: this.handleRounding(duration * this.state.job.rate, 2),
      comment: this.state.comment,
      billed: false
    };

    axios
      .post("/api/entry/add", entry)
      .then(result => {
        console.log(entry);
        this.props.getAllEntries(this.props.user.user_id);
      })
      .catch(e => {
        console.log(e);
      });

    this.handleResetState();
  }

  getAllJobs() {
    let userId = this.props.user.user_id;
    axios
      .get(`/api/jobs/${userId}`)
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
      let numArray = ("" + number).split("e");
      return +(
        numArray[0] +
        "e" +
        (numArray[1] ? +numArray[1] + precision : precision)
      );
    };

    return shift(Math.round(shift(number, +precision)), -precision);
  }

  render() {
    let jobArr = this.props.allJobs.map(job => {
      return (
        <MenuItem key={job.job_id} primaryText={job.job_name} value={job} />
      );
    });

    const stylePaper = {
      style : {
        backgroundColor : '#6B6E70'
    }}

    const buttonStyle1 = {
      labelColor : "white",
      backgroundColor: "#86C232"
    };

    const buttonStyle2 = {
      labelColor : "white",
      backgroundColor: "#86C232"
    }

    const overlayStyle = {
      backgroundColor: "rgba(0,0,0, .89)"
    }
    return (
      <div>
        <FloatingActionButton
          onClick={() => this.handleOpenModal()}
          mini={false}
          disabled={false}
          zDepth={4}
          backgroundColor='#86C232'
        >
          <ContentAdd />
          <Dialog 
          contentStyle={{ width: "fit-content" }}
          paperProps = {stylePaper}
          overlayStyle={overlayStyle}
          autoScrollBodyContent={true}
          modal={true} 
          open={this.state.modalOpen}>
            
              <SelectField
              fullWidth={true}
              labelStyle={{color: "white"}}
              floatingLabelStyle={{color:'#86C232'}} 
              hintText="Select Job"
              floatingLabelText="Select Job"
              value={this.state.job}
              onChange={(event, index, value) =>
                this.hanldeJobSelect(event, index, value)
              }>
              {jobArr}
              </SelectField>
              <DatePicker 
              fullWidth={true}
              textFieldStyle={{color: 'white'}}
              inputStyle={{color: 'white'}}
              floatingLabelStyle={{color:'#86C232'}}
              onChange={this.handleDateChange}
                name="startDate"
                hintText="Entry Date"
                floatingLabelText="Entry Date"
              />

              <TimePicker
              fullWidth={true}
              textFieldStyle={{color: 'white'}}
              inputStyle={{color: 'white'}}
              floatingLabelStyle={{color:'#86C232'}}
                onChange={this.handleTimeSelectStart}
                floatingLabelText="Entry Start Time"
                hintText="Enty Start Time"
                name="startTime"
              />
              <TimePicker
              fullWidth={true}
              textFieldStyle={{color: 'white'}}
              inputStyle={{color: 'white'}}
              floatingLabelStyle={{color:'#86C232'}}
                onChange={this.handleTimeSelectEnd}
                floatingLabelText="Entry End Time"
                hintText="Enty End Time"
                name="endTime"
              />

              <TextField
              fullWidth={true}
              textFieldStyle={{color: 'white'}}
              inputStyle={{color: 'white'}}
              floatingLabelStyle={{color:'#86C232'}}
              underlineFocusStyle={{borderColor: "#86C232" }}
              type="text"
              value={this.state.comment} 
              onChange={e => this.handleTextChange(e)}
              name="comment" hintText="Comment" floatingLabelText="Comment"
              />

              <div className='entry-form-buttons'>
                <RaisedButton backgroundColor={buttonStyle1.backgroundColor} labelColor={buttonStyle1.labelColor} label="CANCEL" secondary={true} onClick={() => this.handleCancelModalClick()}/>

                <RaisedButton backgroundColor={buttonStyle2.backgroundColor} labelColor={buttonStyle2.labelColor} onClick={() => this.handleAddEntry()} label="CONFIRM" primary={true}/>
              </div>
            
          </Dialog>
          <div />
        </FloatingActionButton>
        
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
    allJobs: state.jobReducer.allJobs
  };
}

export default connect(mapStateToProps, {getAllEntries, getAllActiveJobs})(EntryForm);
