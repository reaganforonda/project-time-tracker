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

  const listItemStyle = {
    color: "#F3FFE2",
    textAlign: "center"
  };

  return (
    <div className="menu">
      <Drawer
        containerStyle={{ backgroundColor: "#225378" }}
        docked={true}
        width={200}
        open={true}
        className="menu-drawer"
      >
        <div className="avatar-container">
          <Avatar src={props.img} size={75} onClick={navToUserView} />
          <p>{props.user.user_name}</p>
        </div>

        <List>
          <ListItem
            style={listItemStyle}
            hoverColor={"#EB7F00"}
            onClick={navToDashboard}
            primaryText="ANALYTICS"
          />
          <ListItem
            hoverColor={"#EB7F00"}
            style={listItemStyle}
            onClick={navToJobView}
            primaryText="JOBS"
          />
          <ListItem
            hoverColor={"#EB7F00"}
            style={listItemStyle}
            onClick={navToEntryView}
            primaryText="ENTERIES"
          />
          <ListItem
            hoverColor={"#EB7F00"}
            style={listItemStyle}
            onClick={navToClientView}
            primaryText="CLIENTS"
          />
          <ListItem
            hoverColor={"#EB7F00"}
            style={listItemStyle}
            onClick={navToBillingView}
            primaryText="BILLING"
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
