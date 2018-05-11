import React from 'react';
import {connect} from 'react-redux'
import {Doughnut} from 'react-chartjs-2';
import {Paper} from 'material-ui'
import numeral from 'numeral'
import {getInProgressCount, getInProgressTotals} from '../../ducks/analyticsReducer'

export class Analytics extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        this.props.getInProgressCount(this.props.user.user_id)
        this.props.getInProgressTotals(this.props.user.user_id)
    }

    render (){
        return (
            <div>
                <div className='jobs-in-progress'>
                    <Paper>
                        <h1>JOBS IN PROGRESS : <span className='progress-count'>{numeral(this.props.inProgressCount).format('0,0.0')}</span></h1>
                        <h1>ACCRUED HOURS: <span className='progress-hrs'>{numeral(this.props.inProgressTotals.total_hrs).format('0,0.0')}</span></h1>
                        <h1>ACCRUED REVENUE : <span className='progress-count'>{numeral(this.props.inProgressTotals.total_rev).format('$0,0.00')}</span></h1>
                    </Paper>

                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user : state.userReducer.user,
        inProgressCount : state.analyticsReducer.inProgressCount,
        inProgressTotals : state.analyticsReducer.inProgressTotals
    }
}

export default connect(mapStateToProps,{getInProgressCount, getInProgressTotals})(Analytics)