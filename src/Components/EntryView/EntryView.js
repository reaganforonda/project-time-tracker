import React from "react";
import axios from "axios";

import EntryForm from "../EntryForm/EntryForm";
import Entries from "./Entries";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {getAllEntries} from '../../ducks/entryReducer'

export class EntryView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enteries: []
    };

    this.handleDeleteEntry = this.handleDeleteEntry.bind(this);
  }

  // componentDidMount() {
  //   this.props.getAllEntries(this.props.user.user_id)
  // }

  handleDeleteEntry(entry) {
    axios
      .delete(`/api/entry/delete/${this.props.user.user_id}/${entry.entry_id}`)
      .then(result => {
        console.log(result.data);
        this.props.getAllEntries(this.props.user.user_id);
      })
      .catch(e => {
        console.log(`Error while deleting entry: ${e}`);
      });
  }

  render() {
    let entryArr = this.props.allEntries.map(entry => {
      return (
        <div key={entry.entry_id}>
          <Entries
            jobname={entry.job_name}
            clientName={entry.client_name}
            date={entry.entry_date}
            startTime={entry.start_time}
            endTime={entry.end_time}
            duration={entry.duration}
            delete={this.handleDeleteEntry}
            entry={entry}
            edit={this.handleEditEntry}
          />
        </div>
      );
    });

    return (
      <div className="entryview-container">
        {!this.props.user.user_id ? (
          this.props.history.push("/")
        ) : (
          <div>
            <div className="Entry-List-container">{entryArr}</div>
            <div className="floating-action">
              <EntryForm getEntries={this.getAllEntries} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
    allEntries: state.entryReducer.allEntries
  };
}

export default connect(mapStateToProps, {getAllEntries})(withRouter(EntryView));
