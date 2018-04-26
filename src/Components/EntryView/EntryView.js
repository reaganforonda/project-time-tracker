import React from "react";
import axios from "axios";

import EntryForm from "../EntryForm/EntryForm";
import Entries from './Entries';
import { connect } from "react-redux";

export class EntryView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            entries : [],

        }

        this.getAllEntries = this.getAllEntries.bind(this);
    }

    componentDidMount(){
        this.getAllEntries();
        
    }

    componentDidUpdate(){

    }

    getAllEntries() {
        let userid = this.props.user.user_id;
        
        axios.get(`http://localhost:3005/api/entry/${userid}`).then((enteries) => {
            this.setState({enteries : enteries})
        }).catch((e) => {
            console.log(e);
        })
    }
  render() {
    // let entryArr = this.state.entries.map((entry) => {
    //     return (
    //         <div key={entry.entry_id}>

    //         </div>
    //     )
    // })


    return (
      <div className="entryview-container">
                <div className='Entry-List-container'>
                </div>

        <div className="floating-action">
          <EntryForm />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
    return {
        user : state.userReducer.user
    };
}

export default connect(mapStateToProps, null)(EntryView);