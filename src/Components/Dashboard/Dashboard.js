import React from "react";
import Menu from "../Menu/Menu";
import { withRouter, Switch, Route } from "react-router-dom";
import { getUser } from "../../ducks/userReducer";
import { getBilling } from "../../ducks/billingReducer";
import { connect } from "react-redux";
import { Dialog, CircularProgress } from "material-ui";
import JobView from "../JobView/JobView";
import EntryView from "../EntryView/EntryView";
import ClientsView from "../ClientView/ClientView";
import BillingView from "../BillingView/BillingView";
import UserView from "../User/UserView";
import InvoiceView from "../InvoiceView/InvoiceView";
import Analytics from "../Analytics/Analytics";
import {
  getInProgressCount,
  getInProgressTotals
} from "../../ducks/analyticsReducer";
import {
  getClockedInJob,
  getAllActiveJobs,
  getOffTheClockJobs
} from "../../ducks/jobReducer";
import { getAllClients } from "../../ducks/clientReducer";
import { getAllEntries } from "../../ducks/entryReducer";

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openModal: false,
      pathname: ""
    };

    this.loadInRedux = this.loadInRedux.bind(this);
  }

  componentDidMount() {
    this.props.getUser();
    this.setState({ pathname: this.props.location.pathname });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.user.user_id !== nextProps.user.user_id) {
      this.loadInRedux(nextProps.user.user_id);
    }
  }

  loadInRedux(user_id) {
    this.props.getOffTheClockJobs(user_id);
    this.props.getClockedInJob(user_id);
    this.props.getAllClients(user_id);
    this.props.getAllEntries(user_id);
    this.props.getAllActiveJobs(user_id);
  }

  render() {
    let { user_name, picture } = this.props.user;
    return (
      <div className="Dashboard">
        <div className="menu-section">
          <Menu img={picture} userName={user_name} />
        </div>

        <div className="dashboard-container">
          {this.props.userLoading ? (
            <div className="loading-circle">
            <Dialog overlayStyle={{backgroundColor: '#000000'}} paperProps={{style:{backgroundColor: '#000000'}}} open={true}>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems:'center'}}>
            <CircularProgress color="#86C232" size={200} />
              <div className="loading-text">LOADING USER</div>
            </div>
              
              </Dialog>
            </div>
          ) : null}

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
    user: state.userReducer.user,
    userLoading: state.userReducer.loading,
    jobOnClock: state.jobReducer.jobOnClock,
    offTheClockJobs: state.jobReducer.offTheClockJobs,
    clockInJobLoading: state.jobReducer.clockInJobLoading,
    offTheClockJobsLoading: state.jobReducer.offTheClockJobsLoading
  };
}

export default connect(mapStateToProps, {
  getUser,
  getAllActiveJobs,
  getAllEntries,
  getAllClients,
  getClockedInJob,
  getBilling,
  getOffTheClockJobs,
  getInProgressCount,
  getInProgressTotals
})(withRouter(Dashboard));
