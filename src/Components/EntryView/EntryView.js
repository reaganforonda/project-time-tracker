import React from "react";
import axios from "axios";

import EntryForm from "../EntryForm/EntryForm";
import Entries from "./Entries";
import { connect } from "react-redux";

import {getAllEntries} from '../../ducks/entryReducer'

export class EntryView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enteries: []
    };

    this.getAllEntries = this.getAllEntries.bind(this);
  }

  componentDidMount() {
    this.getAllEntries();
  }

  componentDidUpdate() {}

  getAllEntries() {
    let userid = this.props.user.user_id;
    this.props.getAllEntries(userid);
  }


  render() {

    console.log(this.props.entries);
    let entryArr = this.state.enteries.map(entry => {
      return (
        <div key={entry.entry_id}>
          <Entries
            jobname={entry.job_name}
            clientName={entry.client_name}
            date={entry.entry_date}
            startTime={entry.start_time}
            endTime={entry.end_time}
            duration={entry.duration}
          />
        </div>
      );
    });

    return (
      <div className="entryview-container">
        <div className="Entry-List-container" />
            {entryArr}
        <div className="floating-action">
          <EntryForm />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
    entries : state.entryReducer.entries
  };
}

export default connect(mapStateToProps, {getAllEntries})(EntryView);
