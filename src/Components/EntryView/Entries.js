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
                    <p>Job Name: {this.props.jobname}</p>
                    <p>Client: {this.props.clientName}</p>
                    <p>Date: {this.props.date}</p>
                    <p>Start Time: {this.props.startTime}</p>
                    <p>End Time: {this.props.endTime}</p>
                    <p>Duration: {this.props.duration}</p>
                    <RaisedButton label="Edit"/>
                    <RaisedButton onClick={()=> this.props.delete(this.props.entry)} label="Delete"/>
                </Paper>
            </div>
        )
    }
}