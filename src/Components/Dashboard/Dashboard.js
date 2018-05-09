import React from "react";
import Menu from "../Menu/Menu";
import { Link, withRouter, Switch, Route } from "react-router-dom";
import AppBar from "material-ui/AppBar";
import { getUser } from "../../ducks/userReducer";
// import {getAllClients} from '../../ducks/clientReducer'; TODO: REMOVE

import { connect } from "react-redux";
import JobView from "../JobView/JobView";
import EntryView from "../EntryView/EntryView";
import ClientsView from "../ClientView/ClientView";
import BillingView from "../BillingView/BillingView";
import UserView from "../User/UserView";
import InvoiceView from "../InvoiceView/InvoiceView";

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
          {this.props.user.user_id ? (
            <Link to="/dashboard/userview">
              <Menu img={picture} userName={user_name} />
            </Link>
          ) : (
            <Link to="/">
              <Menu img={picture} userName={user_name} />
            </Link>
          )}
        </div>
        {/* <div className='header-bar'>
          <AppBar/>
        </div> */}

        {/* TODO: REMOVE */}

        <div className="dashboard-container">
          <Switch>
            <Route path="/dashboard/jobview" component={JobView} />
            <Route path="/dashboard/entryview" component={EntryView} />
            <Route path="/dashboard/clientsview" component={ClientsView} />
            <Route path="/dashboard/billingview" component={BillingView} />
            <Route path="/dashboard/userview" component={UserView} />
            <Route path="/dashboard/invoiceview" component={InvoiceView} />
          </Switch>
        </div>

        <div className="footer-dashboard" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer.user
  };
}

export default connect(mapStateToProps, { getUser })(withRouter(Dashboard));
