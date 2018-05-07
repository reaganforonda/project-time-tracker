import React from "react";
import { connect } from "react-redux";
import { getUser } from "../../ducks/userReducer";

export class InvoiceView extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getUser();
  }
  render() {
    console.log(this.props.user);
    console.log(this.props.selectedJob)
    return (
      <div>
        <div>
          {this.props.user.first_name} {this.props.user.last_name}
        </div>
        <div>
          <p>{this.props.user.address_one}</p>
          <p>{this.props.user.address_two}</p>
          <p>
            {this.props.user.city}, {this.props.user.state}{" "}
            {this.props.user.zip}
          </p>
          <p>{this.props.user.phone}</p>
          <p>{this.props.user.email}</p>
        </div>

        <div>
          <p>Invoice ID:</p> <p>Invoice Date: </p>
          <p>DUe Date: Total:</p>
        </div>

        <div>
          Client Name:
          Client Address: Client Contact Info
        </div>

        <div>Billing Container</div>
        <div>
          <div>Total</div>
          <div>
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
    selectedJob: state.billingReducer.selectedJob
  };
}

export default connect(mapStateToProps, { getUser })(InvoiceView);
