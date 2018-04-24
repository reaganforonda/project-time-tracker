import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';

export default function Menu(props){
    return (
        <div>
            <Drawer docked={true} width={200} open={true} className='menu-drawer'>
            <Avatar src='http://www.fillmurray.com/100/100' size={75}/>
            <p>Insert Name Here</p>
            <div className='menu-items'>
            <MenuItem>JOBS</MenuItem>
                <MenuItem>ENTERIES</MenuItem>
                <MenuItem>CLIENTS</MenuItem>
                <MenuItem>BILLING</MenuItem>
            </div>
                
            </Drawer>
        </div>
    )
}