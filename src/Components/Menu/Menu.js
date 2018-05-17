import React from "react";
import Drawer from "material-ui/Drawer";
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

  const onHoverColor = '#86C232';

  const listItemStyle = {
    color: "white",
    textAlign: "center",
    marginTop: '5%',
    marginBottom: '5%'
  };

  return (
      <Drawer
        containerStyle={{ backgroundColor: "#000000" }}
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
            hoverColor={onHoverColor}
            onClick={navToDashboard}
            primaryText="ANALYTICS"
          />
          <ListItem
            hoverColor={onHoverColor}
            style={listItemStyle}
            onClick={navToJobView}
            primaryText="JOBS"
          />
          <ListItem
            hoverColor={onHoverColor}
            style={listItemStyle}
            onClick={navToEntryView}
            primaryText="ENTRIES"
          />
          <ListItem
            hoverColor={onHoverColor}
            style={listItemStyle}
            onClick={navToClientView}
            primaryText="CLIENTS"
          />
          <ListItem
            hoverColor={onHoverColor}
            style={listItemStyle}
            onClick={navToBillingView}
            primaryText="BILLING"
          />
          <ListItem
            hoverColor={onHoverColor}
            style={listItemStyle}
            onClick={navToLogout}
            primaryText="LOGOUT"
          />
        </List>
      </Drawer>
  );
}

function mapStateToProps(state) {
  return {
    user: state.userReducer.user
  };
}

export default connect(mapStateToProps, {})(withRouter(Menu));
