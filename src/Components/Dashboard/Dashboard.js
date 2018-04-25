import React from "react";
import Menu from "../Menu/Menu";

import axios from "axios";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import DatePicker from "material-ui/DatePicker";
import RaisedButton from "material-ui/RaisedButton";
import { withRouter, Link, Switch, Route } from "react-router-dom";
import DropMenu from "../DropMenu/DropMenu";
import Routing from "../../routing";
import AppBar from 'material-ui/AppBar';

import { getUser, getAllClients } from "../../ducks/reducer";
import { connect } from "react-redux";

import JobForm from '../JobForm/JobForm';
import JobView from '../JobView/JobView';
import EntryView from '../EntryView/EntryView';
import ClientsView from '../ClientView/ClientView';
import BillingView from '../BillingView/BillingView';

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openModal: false,
      pathname : ''
    };

  }

  componentDidMount() {
    this.props.getUser();
    this.setState({pathname : this.props.location.pathname})
  }

  render() {
    let { user_name, picture } = this.props.user;
    return (
      <div className="Dashboard">
        <div className="menu-section">
          <Menu img={picture} userName={user_name}/>
        </div>
        <div className='header-bar'>
          <AppBar/>
        </div>

        <div className="dashboard-container">
          <Switch>
            <Route path="/dashboard/jobview" component={JobView} />
            <Route path="/dashboard/entryview" component={EntryView} />
            <Route path="/dashboard/clientsview" component={ClientsView} />
            <Route path="/dashboard/billingview" component={BillingView} />
          </Switch>
        </div>

        <div className="footer-dashboard" />
 
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { getUser })(withRouter(Dashboard));
