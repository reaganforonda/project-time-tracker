import React from "react";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import Avatar from "material-ui/Avatar";
import {withRouter } from "react-router-dom";

import { connect } from "react-redux";

export function Menu(props) {
  let navToDashboard = () => {
    if(props.user.user_id) {
      props.history.push("/dashboard");
    } else {
      props.history.push("/");
    }
    
  };

  let navToJobView = () => {
    if(props.user.user_id) {
      props.history.push("/dashboard/jobview");
    } else {
      props.history.push('/')
    }
    
  };

  let navToEntryView = () => {
    if(props.user.user_id) {

      props.history.push("/dashboard/entryview");
    } else {
      props.history.push('/')
    }
  };

  let navToClientView = () => {
    if(props.user.user_id) {

      props.history.push("/dashboard/clientsview");
    } else {
      props.history.push('/')
    }
  };

  let navToBillingView = () => {
    if(props.user.user_id) {

      props.history.push("/dashboard/billingview");
    } else {
      props.history.push('/')
    }
  };

  let navToUserView = () => {
    if(props.user.user_id) {
      props.history.push('/dashboard/userview')
    } else {
      props.history.push('/')
    }
  }

  return (
    <div className="menu">
      <Drawer docked={true} width={200} open={true} className="menu-drawer">
        {/* {props.user.user_id ? (
          <div>
            <Link to="/dashboard/userview">
              <Avatar onClick={navToUserView} src={props.img} size={75} />
            </Link>
            <p>{props.userName}</p>
          </div>
        ) : (
          <div>
            <Link to="/">
              <Avatar src={props.img} size={75} />
            </Link>
          </div>
        )} */}

        <div>
        <Avatar src={props.img} size={75} onClick={navToUserView}/>
        </div>


        <div className="menu-items">
          <MenuItem onClick={navToDashboard} primaryText="DASHBOARD" />
          <MenuItem onClick={navToJobView} primaryText="JOBS" />
          <MenuItem onClick={navToEntryView} primaryText="ENTERIES" />
          <MenuItem onClick={navToClientView} primaryText="CLIENTS" />
          <MenuItem onClick={navToBillingView} primaryText="BILLING" />
          
        </div>
      </Drawer>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.userReducer.user
  };
}

export default connect(mapStateToProps, {})(withRouter(Menu));
