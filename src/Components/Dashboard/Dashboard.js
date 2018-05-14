import React from "react";
import Menu from "../Menu/Menu";
import { withRouter, Switch, Route } from "react-router-dom";
import { getUser } from "../../ducks/userReducer";
import {getBilling} from '../../ducks/billingReducer';
import { connect } from "react-redux";
import JobView from "../JobView/JobView";
import EntryView from "../EntryView/EntryView";
import ClientsView from "../ClientView/ClientView";
import BillingView from "../BillingView/BillingView";
import UserView from "../User/UserView";
import InvoiceView from "../InvoiceView/InvoiceView";
import Analytics from '../Analytics/Analytics'
import {  getInProgressCount,
  getInProgressTotals}  from '../../ducks/analyticsReducer'

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openModal: false,
      pathname: ""
    };
  }

  componentDidMount() {
    this.props.getUser();
    this.setState({ pathname: this.props.location.pathname });
  }

 

  render() {
    let { user_name, picture } = this.props.user;

    return (
      <div className="Dashboard">
        <div className="menu-section">
          <Menu img={picture} userName={user_name} />
        </div>
        
        <div className="dashboard-container">
          <Switch>
            <Route path="/dashboard/jobview" component={JobView} />
            <Route path="/dashboard/entryview" component={EntryView} />
            <Route path="/dashboard/clientsview" component={ClientsView} />
            <Route path="/dashboard/billingview" component={BillingView} />
            <Route path="/dashboard/userview" component={UserView} />
            <Route path="/dashboard/invoiceview" component={InvoiceView} />
            <Route path="/dashboard/analytics" component={Analytics} />
          </Switch>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer.user
  };
}

export default connect(mapStateToProps, { getUser, getBilling,   getInProgressCount,
  getInProgressTotals })(withRouter(Dashboard));
