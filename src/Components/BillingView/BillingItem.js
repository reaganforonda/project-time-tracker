import React from "react";
import {
  Paper,
  // TextField, TODO: REMOVE
  FlatButton,
  RaisedButton,
  Dialog,
  DatePicker
} from "material-ui";

// import ActionFavorite from "material-ui/svg-icons/action/favorite"; TODO: REMOVE
// import ActionFavoriteBorder from "material-ui/svg-icons/action/favorite-border"; TODO: REMOVE
// import Visibility from "material-ui/svg-icons/action/visibility"; TODO: REMOVE
// import VisibilityOff from "material-ui/svg-icons/action/visibility-off"; TODO: REMOVE
import { connect } from "react-redux";

import {
  getLastBillingNumber,
  selectedForBilling,
  updateInvoiceNum,
  updateJobEndDate,
  updateInvoiceDate,
  updateDueDate,
  getEnteriesForJob
} from "../../ducks/billingReducer";
import { Link } from "react-router-dom";

export class BillingItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      invoiceNumber: "",
      lastInvID: "",
      invoiceDate: {},
      dueDate: {},
      jobEndDate: ""
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleSetInvoiceNumber = this.handleSetInvoiceNumber.bind(this);
    this.handleSetNewInvoiceNum = this.handleSetNewInvoiceNum.bind(this);
    this.handleDueDateChange = this.handleDueDateChange.bind(this);
    this.setDefaultDates = this.setDefaultDates.bind(this);
    this.handleInvoiceDateChange = this.handleInvoiceDateChange.bind(this);
    this.handleLinkClick = this.handleLinkClick.bind(this);
    this.handleJobEndDateSelect = this.handleJobEndDateSelect.bind(this);
  }

  

  handleOpenModal() {
    this.setState({ open: true });
    this.handleSetInvoiceNumber();
    this.handleSetNewInvoiceNum();
    this.setDefaultDates();
  }

  handleCloseModal() {
    this.setState({ open: false });
  }

  handleSetInvoiceNumber() {
    let lastid = this.props.lastInvoiceId;
    console.log(this.props.lastInvoiceId)
      this.setState({ lastInvID: lastid });

  }

  handleSetNewInvoiceNum() {
    let newInvoiceID = this.props.lastInvoiceId + 1;
    let padding = `INV`;
    let newNewInvNum = padding + String(newInvoiceID);
    this.setState({ invoiceNumber: newNewInvNum });
  }

  handleInvoiceDateChange(e, date) {
    this.setState({ invoiceDate: date });
  }

  handleDueDateChange(e, date) {
    this.setState({ dueDate: date });
  }

  setDefaultDates() {
    let invoiceDate = new Date();
    let dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 30);
    this.setState({ invoiceDate: invoiceDate, dueDate: dueDate });
  }

  handleLinkClick() {
    this.props.selectedForBilling(this.props.job);
    this.props.updateInvoiceNum(this.state.invoiceNumber);
    this.props.updateInvoiceDate(this.state.invoiceDate);
    this.props.updateDueDate(this.state.dueDate);
    this.props.getEnteriesForJob(
      this.props.user.user_id,
      this.props.job.job_id
    );
    this.props.updateJobEndDate(this.state.jobEndDate);
    this.handleCloseModal();
  }

  handleJobEndDateSelect(e, date) {
    this.setState({ jobEndDate: date });
  }

  render() {
    return (
      <div>
        <Paper>
          <p>{this.props.jobId}</p>
          <p>{this.props.jobName}</p>
          <p>{this.props.job.total_hrs}</p>
          <p>{this.props.total}</p>
          <FlatButton
            onClick={() => this.handleOpenModal()}
            label="Select For Billing"
          >
            <Dialog modal={true} open={this.state.open}>
              <p>Invoice Number: {this.state.invoiceNumber}</p>
              <p>Client Name: {this.props.job.client_name}</p>
              <p>Job Name: {this.props.job.job_name}</p>
              <p>Total Hours: {this.props.job.total_hrs}</p>
              <p>Total: {this.props.job.total}</p>

              <DatePicker
                onChange={this.handleJobEndDateSelect}
                hintText="Select Job End Date"
                floatingLabelText="Select Job End Date"
              />
              <DatePicker
                onChange={this.handleInvoiceDateChange}
                defaultDate={this.state.invoiceDate}
                hintText="Select Invoice Date"
                floatingLabelText="Select Invoice Date"
              />
              <DatePicker
                defaultDate={this.state.dueDate}
                onChange={this.handleDueDateChange}
                hintText="Select Due Date"
                floatingLabelText="Select Due Date"
              />
              <RaisedButton
                onClick={() => this.handleCloseModal()}
                label="Cancel"
              />
              <Link onClick={() => this.handleLinkClick()} to="/invoiceview">
                <RaisedButton label="Preview" />
              </Link>
            </Dialog>
          </FlatButton>
        </Paper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
    lastInvoiceId: state.billingReducer.lastInvoiceId,
    selectedJob: state.billingReducer.selectedJob,
    invoiceNum: state.billingReducer.invoiceNum,
    dueDate: state.billingReducer.dueDate,
    invoiceDate: state.billingReducer.invoiceDate,
    jobEndDate: state.billingReducer.jobEndDate
  };
}

export default connect(mapStateToProps, {
  getLastBillingNumber,
  selectedForBilling,
  updateInvoiceNum,
  updateInvoiceDate,
  updateDueDate,
  getEnteriesForJob,
  updateJobEndDate
})(BillingItem);
