import React from "react";
import Menu from "../Menu/Menu";

import { Paper, RaisedButton } from "material-ui";
import BillingItem from "./BillingItem";
import { connect } from "react-redux";
import { getBilling } from "../../ducks/billingReducer";
import { Link } from "react-router-dom";

export class BillingView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      billing: []
    };

    this.getBilling = this.getBilling.bind(this);
  }

  componentDidMount() {
    this.getBilling();
  }

  getBilling() {
    this.props.getBilling(this.props.user.user_id);
  }

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

    return (
      <div className="billing-view-container">
        <div className="billing-view-top-menu">
          <RaisedButton label="Invoice" />
          <RaisedButton label="Upload Invoice" />
          <RaisedButton label="Email Client" />
        </div>
        <div className="billing-items-container">{arr}</div>

        <div className="billing-view-footer>">
          <Link to="/invoiceview" target="_blank">
            <RaisedButton label="Preview Invoice" />
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
    billing: state.billingReducer.billing,
    selectedJob: state.billingReducer.selectedJob
  };
}

export default connect(mapStateToProps, { getBilling })(BillingView);
