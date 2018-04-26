import React from 'react';
import {Paper} from 'material-ui';


export default class Entries extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            openModal: false
        }
    }

    render(){
        return (
            <div className='enteries-container'>
                <Paper>
                    HELLO WORLD
                </Paper>
            </div>
        )
    }
}