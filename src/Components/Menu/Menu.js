import React from "react";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import Avatar from "material-ui/Avatar";
import {Link} from 'react-router-dom';

export default function Menu(props) {
  return (
    <div>
      <Drawer docked={true} width={200} open={true} className="menu-drawer">
        <Avatar src="http://www.fillmurray.com/100/100" size={75} />
        <p>Insert Name Here</p>
        <div className="menu-items">
          <Link className='link' to='/jobview'> <MenuItem>JOBS</MenuItem></Link>
          <Link className='link' to='/entryview'><MenuItem>ENTERIES</MenuItem></Link>
          <Link className='link' to='/clientsview'><MenuItem>CLIENTS</MenuItem></Link>
          <Link className='link' to='/billingview'><MenuItem>BILLING</MenuItem></Link>
        </div>
      </Drawer>
    </div>
  );
}
