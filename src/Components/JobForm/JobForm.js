import React from "react";
import axios from 'axios';
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import DatePicker from "material-ui/DatePicker";
import ContentAdd from "material-ui/svg-icons/content/add";
import RaisedButton from "material-ui/RaisedButton";
import { FloatingActionButton } from "material-ui";

export default class JobForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      jobName: "",
      jobDescription: "",
      startDate: null,
      hourlyRate: 0,
      clients : []
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCancelModalClick = this.handleCancelModalClick.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.handleGetClients = this.handleGetClients.bind(this);
  }

  componentDidMount(){
    this.handleGetClients();
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

  handleOpenModal() {
    this.setState({ modalOpen: true });
  }

  // Formate Datepicker's date to something for useable
  formatDate(date) {
    let formatedDate = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
    return formatedDate;
  }


  handleGetClients(){
    axios.get('http://localhost:3005/api/clients').then((clients) => {
      this.setState({clients : clients.data});
    }).catch((e) => {console.log(e)});
  }

  render() {
    let clientArr = this.state.clients.map()
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
                // value={this.state.startDate}
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
