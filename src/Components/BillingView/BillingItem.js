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
      labelColor : "white",
      backgroundColor: "#86C232"
    };

    const stylePaper = {
      style : {
        backgroundColor : '#6B6E70'
    }}


    const overlayStyle = {
      backgroundColor: "rgba(0,0,0, .89)"
    }
    return (
      <div>
        <Paper zDepth={1} style={style} className="billing-item">
        
        <div className='bill-item-div'>
        <div>
          <p>{this.props.job.client_name}</p>
          </div>
          <div><p>{this.props.jobName}</p></div>
          <div><p>{numeral(this.props.job.total_hrs).format("0,0.0")} Total Hrs.</p></div>
          <div><p >{numeral(this.props.total).format("$0,0.00")}</p></div>
          </div>
          
          <div className='bill-item-button'>
          <FlatButton
            style={{background : '#000000'}}
            labelStyle={{color: '#86C232'}}
            onClick={() => this.handleOpenModal()}
            label="Select For Billing"
            className="select-for-billing-button"
          >
            <Dialog
              overlayStyle={overlayStyle}
              autoScrollBodyContent={true}
              paperProps = {stylePaper}
              modal={true}
              open={this.state.open}
              contentStyle={{ width: "fit-content", height: 'fit-content', minWidth:'500px'}}
            >
              <div className="billing-modal-head">
                <div className="billing-modal-head-sec2">
                  <h1>{this.props.job.client_name}</h1>
                  <h2>{this.props.job.job_name}</h2>
                </div>
                <div className="billing-modal-head-sec1">
                  <h1>INVOICE # : {this.state.invoiceNumber}</h1>
                  <h2>
                    HOURS : <span className='inv-tot'>{numeral(this.props.job.total_hrs).format("0,0.0")}</span>
                  </h2>
                  <h2>
                    TOTAL : <span className='inv-tot'>{numeral(this.props.job.total).format("$0,0.00")}</span>
                  </h2>
                </div>
              </div>

              <DatePicker 
              fullWidth={true} 
              textFieldStyle={{color: 'white'}} 
              inputStyle={{color: 'white'}} 
              floatingLabelStyle={{color:'#86C232'}}
              onChange={this.handleJobEndDateSelect}
              hintText="Select Job End Date"
              floatingLabelText="Select Job End Date"
              />
              <DatePicker
              fullWidth={true} 
              textFieldStyle={{color: 'white'}} 
              inputStyle={{color: 'white'}} 
              floatingLabelStyle={{color:'#86C232'}}
                onChange={this.handleInvoiceDateChange}
                defaultDate={this.state.invoiceDate}
                hintText="Select Invoice Date"
                floatingLabelText="Select Invoice Date"
              />
              <DatePicker
              fullWidth={true} 
              textFieldStyle={{color: 'white'}} 
              inputStyle={{color: 'white'}} 
              floatingLabelStyle={{color:'#86C232'}}
                defaultDate={this.state.dueDate}
                onChange={this.handleDueDateChange}
                hintText="Select Due Date"
                floatingLabelText="Select Due Date"
              />

              <div className="modal-buttons-billing">
                <RaisedButton
                backgroundColor={styleButton.backgroundColor}
                labelColor={styleButton.labelColor}
                  onClick={() => this.handleCloseModal()}
                  label="CANCEL"
                />
                <div>
                  <Link
                    onClick={() => this.handleLinkClick()}
                    to="/invoiceview"
                  >
                    <RaisedButton 
                    labelColor={styleButton.labelColor}
                    backgroundColor={styleButton.backgroundColor}
                    label="PREVIEW" />
                  </Link>
                </div>
              </div>
            </Dialog>
          </FlatButton>
          </div>
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
