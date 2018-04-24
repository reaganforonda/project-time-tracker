import React from 'react';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';

export default function Menu(props){
    return (
        <div>
            <Drawer variant='permanent'>
            
            <Avatar alt='avatar'
            src='http://www.fillmurray.com/100/100'/>
            <h3>THIS IS MY NAME</h3>
            <Button> 
                Jobs
            </Button>
            <Button> 
                Enteries
            </Button>
            <Button> 
                Clients
            </Button>
            <Button> 
                Billing
            </Button>
            </Drawer>
        </div>
    )
}