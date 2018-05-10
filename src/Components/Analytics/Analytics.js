import React from 'react';
import {connect} from 'react-redux'
import {Doughnut} from 'react-chartjs-2';
import {Paper} from 'material-ui'

export class Analytics extends React.Component {
    constructor(props) {
        super(props);
    }

    render (){
        return (
            <div>
                <div className='jobs-in-progress'>
                    <Paper>
                        
                    </Paper>

                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user : state.userReducer.user
    }
}

export default connect(mapStateToProps,{})(Analytics)