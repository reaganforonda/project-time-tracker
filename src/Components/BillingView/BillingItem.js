import React from "react";
import {
  Paper,
  FlatButton,
  RaisedButton,
  Dialog,
  DatePicker
} from "material-ui";

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
import numeral from "numeral";
import moment from "moment";

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
    console.log(this.props.lastInvoiceId);
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
    const style = {
      backgroundColor: "#6B6E70"
    };

    const styleButton = {
      color: "#86C232",
      backgroundColor: "#222629",
      // borderRadius : '30px' TODO: REMOVE
    };

    const stylePaper = {
      backgroundColor: "#1695A3",
      textAlign: "left",
      position: 'relative'
    };

    const dialogStyle = {
      backgroundColor: "rgba(0,0,0, .8)"
    };

    return (
      <div>
        <Paper zDepth={1} style={style} className="billing-item">
          <p>{this.props.job.client_name}</p>
          <p>{this.props.jobName}</p>
          <p>{numeral(this.props.job.total_hrs).format("0,0.0")} Total Hrs.</p>
          <p>{numeral(this.props.total).format("$0,0.00")}</p>
          <FlatButton
            style={styleButton}
            onClick={() => this.handleOpenModal()}
            label="Select For Billing"
            className="select-for-billing-button"
          >
            <Dialog
              overlayStyle={dialogStyle}
              paperProps={{ style: { backgroundColor: "#F3FFE2" } }}
              modal={true}
              open={this.state.open}
              contentStyle={{ width: "400px" }}
            >
              <div className="billing-modal-head">
                <div className="billing-modal-head-sec2">
                  <p>{this.props.job.client_name}</p>
                  <p>{this.props.job.job_name}</p>
                </div>
                <div className="billing-modal-head-sec1">
                  <h1>Invoice Number: {this.state.invoiceNumber}</h1>
                  <h2>
                    Total Hours:
                    {numeral(this.props.job.total_hrs).format("0,0.0")}
                  </h2>
                  <h2>
                    Total: {numeral(this.props.job.total).format("$0,0.00")}
                  </h2>
                </div>
              </div>

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

              <div className="modal-buttons-billing">
                <RaisedButton
                  onClick={() => this.handleCloseModal()}
                  label="Cancel"
                />
                <div>
                  <Link
                    onClick={() => this.handleLinkClick()}
                    to="/invoiceview"
                  >
                    <RaisedButton label="Preview" />
                  </Link>
                </div>
              </div>
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
