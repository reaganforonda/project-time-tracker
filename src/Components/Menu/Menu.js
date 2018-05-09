import React from "react";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import Avatar from "material-ui/Avatar";
import { Link, withRouter } from "react-router-dom";

import { connect } from "react-redux";

export function Menu(props) {
  const style = {
      "background-color": "#225378"
  };
  return (
    <div className="menu">
      <Drawer
        docked={true}
        width={200}
        open={true}
        className="menu-drawer"
        style={style}
      >
        {props.user.user_id ? (
          <div>
            <Link to="/dashboard/userview">
              <Avatar src={props.img} size={75} />
            </Link>
            <p>{props.userName}</p>{" "}
          </div>
        ) : (
          <div>
            <Link to="/">
              <Avatar src={props.img} size={75} />
            </Link>
          </div>
        )}

        <div className="menu-items">
          <Link className="link" to="/dashboard/">
            <MenuItem primaryText="DASHBOARD" />
          </Link>
          <Link className="link" to="/dashboard/jobview">
            <MenuItem style={style.bg} primaryText="JOBS" />
          </Link>
          <Link className="link" to="/dashboard/entryview">
            <MenuItem primaryText="ENTERIES" />
          </Link>
          <Link className="link" to="/dashboard/clientsview">
            <MenuItem primaryText="CLIENTS" />
          </Link>
          <Link className="link" to="/dashboard/billingview">
            <MenuItem primaryText="BILLING" />
          </Link>
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
