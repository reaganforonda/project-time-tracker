import React from 'react';
import MenuItem from'material-ui/MenuItem';

export default function MenuItemCustom(props){
    return(
        <div>
            <MenuItem value={props.value} primaryText={props.primaryText}/>
        </div>
    )
}