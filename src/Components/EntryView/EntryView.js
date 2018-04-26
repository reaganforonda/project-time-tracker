import React from "react";
import axios from "axios";

import EntryForm from "../EntryForm/EntryForm";
import Entries from "./Entries";
import { connect } from "react-redux";

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

// TODO: Change to actual user id
  getAllEntries() {
    let userid = this.props.user.user_id;
    console.log(userid);
    axios
      .get(`http://localhost:3005/api/entry/${userid}`)
      .then(enteries => {
        this.setState({ enteries: enteries.data });
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
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

    console.log(this.state.enteries);

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
    user: state.userReducer.user
  };
}

export default connect(mapStateToProps, null)(EntryView);
