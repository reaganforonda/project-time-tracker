import React from 'react';
import {Paper, RaisedButton} from 'material-ui';


export default class Entries extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            openModal: false
        }
    }

    render(){
        return (
            <div>
                <Paper zDepth={3} className='enteries-container'>
                    <p>{this.props.jobname}</p>
                    <p>{this.props.clientName}</p>
                    <p>{this.props.date}</p>
                    <p>{this.props.startTime}</p>
                    <p>{this.props.endTime}</p>
                    <p>{this.props.duration}</p>
                    <RaisedButton label="Edit"/>
                    <RaisedButton label="Delete"/>
                </Paper>
            </div>
        )
    }
}