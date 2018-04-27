import React from "react";
import axios from "axios";
import ContentAdd from "material-ui/svg-icons/content/add";
import {
  Dialog,
  TextField,
  DatePicker,
  RaisedButton,
  FloatingActionButton,
  MenuItem,
  
  SelectField
} from "material-ui";

import {connect} from 'react-redux';
import {getAllActiveJobs} from '../../ducks/jobReducer'


export class JobForm extends React.Component {
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

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCancelModalClick = this.handleCancelModalClick.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.handleGetClients = this.handleGetClients.bind(this);
    this.handleClientSelect = this.handleClientSelect.bind(this);
    this.handleAddJob = this.handleAddJob.bind(this);

    this.handleOnConfirm = this.handleOnConfirm.bind(this);
    this.handleResetState = this.handleResetState.bind(this);
  }

  componentDidMount() {
    this.handleGetClients();
  }

  handleCancelModalClick() {
this.handleResetState();
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

  // Formate Datepicker's date to something for useable for postgres sql
  formatDate(date) {
    let formatedDate = `${date.getMonth() +
      1}/${date.getDate()}/${date.getFullYear()}`;
    return formatedDate;
  }

  // TODO: Change this so it only get clients related to the logged in User
  handleGetClients() {
    axios
      .get("http://localhost:3005/api/clients")
      .then(clients => {
        this.setState({ clients: clients.data });
      })
      .catch(e => {
        console.log(e);
      });
  }

  handleClientSelect = (event, index, value) => {
    this.setState({ client: value });
  };

  handleAddJob(){
    let job = {
      client_id : this.state.client,
      //TODO: Change this so that it's actually the user logged in
      // TODO: Look at completed ? Should i be auto set to false?
      user_id : 1,
      job_name : this.state.jobName,
      start_date : this.state.startDate,
      completed : false,
      rate : this.state.hourlyRate,
      description : this.state.jobDescription
    }

    axios.post(`http://localhost:3005/api/job`, (job)).then((result) => {
      console.log(result.data);
    }).catch((e) => {
      console.log(`${e}`)
    })
  }

  handleOnConfirm(){
    this.handleAddJob();
    this.setState({modalOpen : false});
    this.handleResetState();
  }

  handleResetState(){
    this.setState({
      modalOpen: false,
      jobName: "",
      jobDescription: "",
      startDate: null,
      hourlyRate: 0,
      client: ""
    })
  }

  render() {
    let clientArr = this.state.clients.map(client => {
      return (
          <MenuItem
            key={client.client_id}
            primaryText={client.client_name}
            value={client.client_id}
          />
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
            <SelectField
              hintText="Select Client"
              floatingLabelText="Select Client"
              value={this.state.client}
     
              onChange={(event, index, value) =>
                this.handleClientSelect(event, index, value)
              }
              
            >
              {clientArr}
            </SelectField>
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

                <RaisedButton label="CONFIRM" primary={true} onClick={()=>this.handleOnConfirm()}/>
              </div>
            </form>
          </Dialog>
        </FloatingActionButton>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    
  }
}

export default connect(mapStateToProps, {getAllActiveJobs})(JobForm)