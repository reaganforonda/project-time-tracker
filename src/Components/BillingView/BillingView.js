import React from "react";
import Menu from "../Menu/Menu";

import {
  Paper,
  RaisedButton,
  Dialog,
  TextField,
  Divider,
  MenuItem,
  SelectField
} from "material-ui";
import BillingItem from "./BillingItem";
import { connect } from "react-redux";
import { getBilling, getLastBillingNumber } from "../../ducks/billingReducer";
import { getAllClients } from "../../ducks/clientReducer";
import { Link } from "react-router-dom";
import Dropzone from "react-dropzone";

export class BillingView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      billing: [],
      uploadModalOpen: false,
      emailModalOpen: false,
      files: [],
      selectedClient: ""
    };

    this.getBilling = this.getBilling.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.handleEmailModalClose = this.handleEmailModalClose.bind(this);
    this.handleEmailModalOpen = this.handleEmailModalOpen.bind(this);
    this.handleUploadModalOpen = this.handleUploadModalOpen.bind(this);
    this.handleUploadModalClose = this.handleUploadModalClose.bind(this);
    this.handleClientSelect = this.handleClientSelect.bind(this);
  }

  componentDidMount() {
    this.getBilling();
    this.props.getLastBillingNumber(this.props.user.user_id);
    
  }

  getBilling() {
    this.props.getBilling(this.props.user.user_id);
  }

  handleUploadModalOpen() {
    this.setState({ uploadModalOpen: true });
  }

  handleUploadModalClose() {
    this.setState({ uploadModalOpen: false });
  }

  handleEmailModalOpen() {
    this.setState({ emailModalOpen: true });
    this.props.getAllClients(this.props.user.user_id);
  }

  handleEmailModalClose() {
    this.setState({ emailModalOpen: false });
  }

  onDrop(files) {
    this.setState({ files });
    console.log(this.state.files);
  }

  handleClientSelect = (event, index, value) => {
    console.log(value);
    this.setState({ selectedClient: value });
    
  };

  render() {
    let arr = this.props.billing.map(value => {
      return (
        <div key={value.job_id}>
          <BillingItem
            job={value}
            jobId={value.job_id}
            jobName={value.job_name}
            totaHrs={value.total_hrs}
            total={value.total}
          />
        </div>
      );
    });

    let clients = this.props.clients.map(client => {
      return (
        <MenuItem
          key={client.client_id}
          value={client.email}
          primaryText={client.client_name}
        />
      );
    });

    return (
      <div className="billing-view-container">
        <div className="billing-view-top-menu">
          <RaisedButton
            onClick={() => this.handleUploadModalOpen()}
            label="Upload Invoice"
          >
            <Dialog modal={true} open={this.state.uploadModalOpen}>
              <Dropzone onDrop={this.onDrop}>
                <p>Drop Invoice or click to select files to upload</p>
              </Dropzone>

              <RaisedButton
                onClick={() => this.handleUploadModalClose()}
                label="Close"
              />
            </Dialog>
          </RaisedButton>

          <RaisedButton
            onClick={() => this.handleEmailModalOpen()}
            label="Email Client"
          >
            <Dialog modal={true} open={this.state.emailModalOpen}>
              <Paper>
                <div>
                  <SelectField
                    value={this.state.selectedClient}
                    onChange={(event, index, value) =>
                      this.handleClientSelect(event, index, value)
                    }
                    hintText="Select Client"
                    floatingLabelText='Select Client'
                  >
                    {clients}
                  </SelectField>
                </div>

                <TextField hintText="TO" underlineShow={false} />
                <Divider />
                <TextField hintText="FROM" underlineShow={false} />
                <Divider />
                <TextField
                  hintText="SUBJECT"
                  defaultValue={this.props.user.email}
                  underlineShow={false}
                />
                <Divider />
                <TextField
                  hintText="BODY"
                  multiLine={true}
                  rows={4}
                  underlineShow={false}
                />
              </Paper>

              <div>
                <RaisedButton
                  onClick={() => this.handleEmailModalClose()}
                  label="Cancel"
                />
                <RaisedButton label="Submit" />
              </div>
            </Dialog>
          </RaisedButton>
        </div>
        <div className="billing-items-container">{arr}</div>

        <div className="billing-view-footer>" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
    billing: state.billingReducer.billing,
    selectedJob: state.billingReducer.selectedJob,
    clients: state.clientReducer.clients
  };
}

export default connect(mapStateToProps, {
  getBilling,
  getLastBillingNumber,
  getAllClients
})(BillingView);
