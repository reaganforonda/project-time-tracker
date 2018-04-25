import React from "react";
import Menu from "../Menu/Menu";
import Jobs from "../Jobs/Jobs";
import axios from "axios";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import DatePicker from "material-ui/DatePicker";
import RaisedButton from "material-ui/RaisedButton";
import { withRouter, Link } from "react-router-dom";
import DropMenu from "../DropMenu/DropMenu";
import Routing from '../../routing';

import { getUser, getAllClients } from "../../ducks/reducer";
import { connect } from "react-redux";

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.getUser();
  }

  render() {
    console.log(this.props.user);
    let { display_name, img } = this.props.user;
    return (
      <div className="Dashboard">
        <div className="menu-section">
          <Menu />
        </div>
        <div className='dashboard-container'>
        </div>
        <div className='footer-dashboard'>
            
        </div>
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
