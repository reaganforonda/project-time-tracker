import React from "react";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import { List, ListItem } from "material-ui";
import Avatar from "material-ui/Avatar";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";

export function Menu(props) {
  let navToDashboard = () => {
    if (props.user.user_id) {
      props.history.push("/dashboard/analytics");
    } else {
      props.history.push("/");
    }
  };

  let navToJobView = () => {
    if (props.user.user_id) {
      props.history.push("/dashboard/jobview");
    } else {
      props.history.push("/");
    }
  };

  let navToEntryView = () => {
    if (props.user.user_id) {
      props.history.push("/dashboard/entryview");
    } else {
      props.history.push("/");
    }
  };

  let navToClientView = () => {
    if (props.user.user_id) {
      props.history.push("/dashboard/clientsview");
    } else {
      props.history.push("/");
    }
  };

  let navToBillingView = () => {
    if (props.user.user_id) {
      props.history.push("/dashboard/billingview");
    } else {
      props.history.push("/");
    }
  };

  let navToUserView = () => {
    if (props.user.user_id) {
      props.history.push("/dashboard/userview");
    } else {
      props.history.push("/");
    }
  };

  let navToLogout = ()=> {
    if (props.user.user_id) {
      props.history.push('/');
    } else {
      props.history.push('/');
    }
  }

  const listItemStyle = {
    color: "white",
    textAlign: "center",
    marginTop: '5%',
    marginBottom: '5%'
  };

  return (
    <div className="menu">
      <Drawer
        containerStyle={{ backgroundColor: "black" }}
        docked={true}
        width={200}
        open={true}
        className="menu-drawer"
      >
        <div className="avatar-container">
          <Avatar src={props.img} size={75} onClick={navToUserView} />
          <p style={{color: '#86C232', marginBottom:'5%', marginTop:'5%'}}>{props.user.user_name}</p>
        </div>

        <List>
          <ListItem
            style={listItemStyle}
            hoverColor={"#86C232"}
            onClick={navToDashboard}
            primaryText="ANALYTICS"
          />
          <ListItem
            hoverColor={"#86C232"}
            style={listItemStyle}
            onClick={navToJobView}
            primaryText="JOBS"
          />
          <ListItem
            hoverColor={"#86C232"}
            style={listItemStyle}
            onClick={navToEntryView}
            primaryText="ENTRIES"
          />
          <ListItem
            hoverColor={"#86C232"}
            style={listItemStyle}
            onClick={navToClientView}
            primaryText="CLIENTS"
          />
          <ListItem
            hoverColor={"#86C232"}
            style={listItemStyle}
            onClick={navToBillingView}
            primaryText="BILLING"
          />
          <ListItem
            hoverColor={"#86C232"}
            style={listItemStyle}
            onClick={navToLogout}
            primaryText="LOGOUT"
          />
        </List>
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
