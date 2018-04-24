import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

export default function DropMenu(props){
    const width = 700;
    return (
        <div>
            <DropDownMenu maxHeight={100} style={{width: 500}}>
                <MenuItem primaryText='Client 1'/>
                <MenuItem primaryText='Client 2'/>
                <MenuItem  primaryText='Client 3'/>
                <MenuItem primaryText='Client 4'/>
                <MenuItem  primaryText='Client 5'/>
            </DropDownMenu>

        </div>
    )
}