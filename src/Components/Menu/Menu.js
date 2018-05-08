import React from "react";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import Avatar from "material-ui/Avatar";
import {Link} from 'react-router-dom';

export default function Menu(props) {
  
  return (
    <div className='menu'>
      
      <Drawer docked={true} width={200} open={true} className="menu-drawer">
        <Avatar src={props.img} size={75} />
        <p>{props.userName}</p>
        <div className="menu-items">
          <Link className='link' to='/dashboard/jobview'> <MenuItem primaryText="JOBS"></MenuItem></Link>
          <Link className='link' to='/dashboard/entryview'><MenuItem primaryText="ENTERIES"></MenuItem></Link>
          <Link className='link' to='/dashboard/clientsview'><MenuItem primaryText="CLIENTS"></MenuItem></Link>
          <Link className='link' to='/dashboard/billingview'><MenuItem primaryText="BILLING"></MenuItem></Link>
        </div>
      </Drawer>
    </div>
  );
}
