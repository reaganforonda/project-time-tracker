import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getUser } from "../../ducks/userReducer";
import printJS from "../../../node_modules/print-js/src/index";
import { Link } from "react-router-dom";
import { RaisedButton } from "material-ui";
import numeral from 'numeral';
import moment from 'moment';

export class InvoiceView extends React.Component {
  constructor(props) {
    super(props);

    this.handleDateConvert = this.handleDateConvert.bind(this);
    this.handlePrint = this.handlePrint.bind(this);
    this.handleAddBilling = this.handleAddBilling.bind(this);
    this.updateJobBilling = this.updateJobBilling.bind(this);
  }
  componentDidMount() {
    this.props.getUser();
  }

  handleDateConvert(date) {
    let formatedDate = `${date.getMonth() +
      1}/${date.getDate()}/${date.getFullYear()}`;

    return formatedDate;
  }

  handlePrint() {
    printJS("print-invoice", "html");
    this.handleAddBilling();
    this.updateJobBilling();
  }

  handleAddBilling() {
    let invoice = {
      job_id: this.props.selectedJob.job_id,
      client_id: this.props.selectedJob.client_id,
      user_id: this.props.user.user_id,
      invoice_date: this.handleDateConvert(this.props.invoiceDate),
      total: this.props.selectedJob.total,
      invoice_number: this.props.invoiceNum,
      due_date: this.props.dueDate
    };
    axios
      .post(
        `http://localhost:3005/api/billing/add/${this.props.user.user_id}`,
        invoice
      )
      .then(result => {
        console.log(result);
      })
      .catch(e => {
        console.log(`Error During POST At Invoice View: ${e}`);
      });
  }

  updateJobBilling() {
    
    let end_date = {end_date : this.handleDateConvert(this.props.jobEndDate)};

    axios
      .put(
        `http://localhost:3005/api/jobs/billing/update/${this.props.user.user_id}/${
          this.props.selectedJob.job_id
        }`,
        end_date
      )
      .then(result => {
        console.log(result);
      })
      .catch(e => {
        console.log(`Error during PUT at Invoice View: ${e}`);
      });
  }

  render() {
    let arr = this.props.entries.map(entry => {
      return (
        <div key={entry.entry_id}>
          <p>
            {this.props.selectedJob.job_name} - {entry.comment}
          </p>
          <p>Hrs: {numeral(entry.duration).format('0,0.00')}</p>
          <p>Rate: {numeral(this.props.selectedJob.rate).format('$0,0.00')} / hr</p>
          <p>SubTotal: {numeral(entry.total).format('$0,0.00')}</p>
        </div>
      );
    });

    return (
      <div>
        <div id="print-invoice">
          <div className="user-contact-info">
            <p>
              {this.props.user.first_name} {this.props.user.last_name}
            </p>
            <p>{this.props.user.address_one}</p>
            <p>{this.props.user.address_two}</p>
            <p>
              {this.props.user.city}, {this.props.user.state}{" "}
              {this.props.user.zip}
            </p>
            <p>{this.props.user.phone}</p>
            <p>{this.props.user.email}</p>
          </div>

          <div className="invoice-info">
            <p>Invoice Number: {this.props.invoiceNum}</p>
            <p>
              Invoice Date: {this.handleDateConvert(this.props.invoiceDate)}
            </p>
            <p>Due Date: {this.handleDateConvert(this.props.dueDate)}</p>
            <p>Total: {numeral(this.props.selectedJob.total).format('$0,0.00')}</p>
          </div>

          <div className="client-info">
            <p>{this.props.selectedJob.client_name}</p>
            <p>{this.props.selectedJob.address_one}</p>
            {this.props.selectedJob.address_two ? (
              <p>{this.props.selectedJob.address_two}</p>
            ) : null}
            <p>
              {this.props.selectedJob.city}, {this.props.selectedJob.state}{" "}
              {this.props.selectedJob.zip}
            </p>
            <p>{this.props.selectedJob.phone}</p>
          </div>

          <div className="billing-container">{arr}</div>
          <div>
            <div className="total-box">
              <p>Total</p>
              <div>{numeral(this.props.selectedJob.total).format('$0,0.00')}</div>
            </div>
            <div className="remit">
              Remit To:
              <p>
                {this.props.user.first_name} {this.props.user.last_name}
              </p>
              <p>{this.props.user.address_one}</p>
              <p>{this.props.user.address_two}</p>
              <p>
                {this.props.user.city}, {this.props.user.state}{" "}
                {this.props.user.zip}
              </p>
            </div>
          </div>
        </div>
        <div>
          <Link to="/dashboard/billingview">
            <RaisedButton label="Return" />
          </Link>
          <RaisedButton label="Print" onClick={() => this.handlePrint()} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
    selectedJob: state.billingReducer.selectedJob,
    dueDate: state.billingReducer.dueDate,
    invoiceNum: state.billingReducer.invoiceNum,
    invoiceDate: state.billingReducer.invoiceDate,
    entries: state.billingReducer.entries,
    jobEndDate: state.billingReducer.jobEndDate
  };
}

export default connect(mapStateToProps, { getUser })(InvoiceView);
