import React from "react";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import Avatar from "material-ui/Avatar";
import {Link, withRouter} from 'react-router-dom';

export function Menu(props) {
    const style = {
       bg : {
         'background-color' : '#225378'
       }
    }
  return (
    <div className='menu'>
      
      <Drawer docked={true} width={200} open={true} className="menu-drawer" style={style.bg}>
        <Avatar src={props.img} size={75} />
        <p>{props.userName}</p>
        <div className="menu-items">
          <Link className='link' to='/dashboard/jobview'> <MenuItem style={style.bg} primaryText="JOBS"></MenuItem></Link>
          <Link className='link' to='/dashboard/entryview'><MenuItem primaryText="ENTERIES"></MenuItem></Link>
          <Link className='link' to='/dashboard/clientsview'><MenuItem primaryText="CLIENTS"></MenuItem></Link>
          <Link className='link' to='/dashboard/billingview'><MenuItem primaryText="BILLING"></MenuItem></Link>
        </div>
      </Drawer>
    </div>
  );
}

export default withRouter(Menu);