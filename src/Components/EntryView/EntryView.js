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
    this.handleDeleteEntry = this.handleDeleteEntry.bind(this);
    this.handleEditEntry = this.handleEditEntry.bind(this);
  }

  componentDidMount() {
    this.getAllEntries();
  }

  componentDidUpdate() {}

  getAllEntries() {
    axios.get(`http://localhost:3005/api/entry/${this.props.user.user_id}`).then((enteries) => {
      this.setState({enteries : enteries.data})
    }).catch((e) => {
      console.log(e);
    })
  }

  handleDeleteEntry(entry) {
    axios.delete(`http://localhost:3005/api/entry/delete/${this.props.user.user_id}/${entry.entry_id}`).then((result) => {
      console.log(result.data);
    }).catch((e) => {
      console.log(`Error while deleting entry: ${e}`);
    })

    this.getAllEntries();
  }

  handleEditEntry(entry){
    <EntryForm/>
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
            delete = {this.handleDeleteEntry}
            entry = {entry}
            edit = {this.handleEditEntry}
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
