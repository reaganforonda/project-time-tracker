import React from "react";
import { connect } from "react-redux";
import { getUser } from "../../ducks/userReducer";

export class InvoiceView extends React.Component {
  constructor(props) {
    super(props);

    this.handleDateConvert = this.handleDateConvert.bind(this);
  }
  componentDidMount() {
    this.props.getUser();
  }

  handleDateConvert(date) {
    let formatedDate = `${date.getMonth() +
      1}/${date.getDate()}/${date.getFullYear()}`;

    return formatedDate;
  }
  render() {
    return (
      <div>
        <div className="user-contact-info">
          {this.props.user.first_name} {this.props.user.last_name}
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
          <p>Invoice Date: {this.handleDateConvert(this.props.invoiceDate)}</p>
          <p>Due Date: {this.handleDateConvert(this.props.dueDate)}</p>
          <p>Total: ${this.props.selectedJob.total}</p>
        </div>

        <div className='client-info'>
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

        <div className='billing-container'>Billing Container</div>
        <div>
          <div className="total-box">
            <p>Total</p>
            <div>${this.props.selectedJob.total}</div>
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
    dueDate: state.billingReducer.dueDate
  };
}

export default connect(mapStateToProps, { getUser })(InvoiceView);
