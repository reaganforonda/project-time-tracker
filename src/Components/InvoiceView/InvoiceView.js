import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getUser } from "../../ducks/userReducer";
import printJS from "../../../node_modules/print-js/src/index";
import { Link } from "react-router-dom";
import { RaisedButton, Divider } from "material-ui";
import numeral from "numeral";
import moment from "moment";

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";

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
    let end_date = { end_date: this.handleDateConvert(this.props.jobEndDate) };

    axios
      .put(
        `http://localhost:3005/api/jobs/billing/update/${
          this.props.user.user_id
        }/${this.props.selectedJob.job_id}`,
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
        <TableRow displayBorder={false} selectable={false} key={entry.entry_id}>
          <TableRowColumn>
            {this.props.selectedJob.job_name} - {entry.comment}
          </TableRowColumn>
          <TableRowColumn>
            {numeral(entry.duration).format("0,0.00")}
          </TableRowColumn>
          <TableRowColumn>
            {numeral(this.props.selectedJob.rate).format("$0,0.00")}
          </TableRowColumn>
          <TableRowColumn>
            {numeral(entry.total).format("$0,0.00")}
          </TableRowColumn>
        </TableRow>
      );
    });

    return (
      <div>
        <div id="print-invoice" className="inv">
          <header className="invoice-header">
            <h1>INVOICE</h1>
            <div className="user-contact-info">
              <div className="user-info-section-1">
                <p>{this.props.user.phone}</p>
                <p>{this.props.user.email}</p>
              </div>

              <div className="user-info-section-2">
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
          </header>

          <section className="mid-section">
            <div className="client-info">
              <h2>BILL TO:</h2>
              <p>{this.props.selectedJob.client_name}</p>
              <p>{this.props.selectedJob.address_one}</p>
              {this.props.selectedJob.address_two ? (
                <p>{this.props.selectedJob.address_two}</p>
              ) : null}
              <p>
                {this.props.selectedJob.city}, {this.props.selectedJob.state}
                {this.props.selectedJob.zip}
              </p>
              <p>{this.props.selectedJob.phone}</p>
            </div>

            <div className="invoice-info-sect1">
              <p>Invoice Number: {this.props.invoiceNum}</p>
              <p>
                Invoice Date: {this.handleDateConvert(this.props.invoiceDate)}
              </p>

              <p>Due Date: {this.handleDateConvert(this.props.dueDate)}</p>
            </div>
            <div className="inv-total">
              <p>Total:</p>
              <p className="main-total">
                {numeral(this.props.selectedJob.total).format("$0,0.00")}
              </p>
            </div>
          </section>

          <hr className="invoice-hr" />

          <div className="invoice-table">
            <Table
              displayBorder={false}
              displaySelectAll={false}
              adjustForCheckbox={false}
              displayRowCheckbox={false}
              selectable={false}
            >
              <TableHeader
                displayBorder={false}
                displaySelectAll={false}
                adjustForCheckbox={false}
                displayRowCheckbox={false}
                selectable={false}
              >
                <TableRow
                  displayBorder={false}
                  displayRowCheckbox={false}
                  selectable={false}
                >
                  <TableHeaderColumn>Description</TableHeaderColumn>
                  <TableHeaderColumn>Hours</TableHeaderColumn>
                  <TableHeaderColumn>Rate ($/Hr)</TableHeaderColumn>
                  <TableHeaderColumn>Subtotal</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody
                displayBorder={false}
                displayRowCheckbox={false}
                selectable={false}
              >
                {arr}
              </TableBody>
            </Table>
          </div>

          <div className="bottom-section">
            <div className="remit">
              <h2>Remit To:</h2>
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
