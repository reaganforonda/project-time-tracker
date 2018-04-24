import React from 'react';
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import DatePicker from "material-ui/DatePicker";
import RaisedButton from "material-ui/RaisedButton";

export class JobForm extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            
        }
    }

    handleCancelModalClick() {
        this.setState({
          modalOpen: false,
          jobName: "",
          jobDescription: "",
          startDate: null,
          hourlyRate: 0
        });
      }


  handleTextChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleDateChange(e, date) {
    this.setState({ startDate: date });
  }


  // Formate Datepicker's date to something for useable
  formatDate(date){
    let formatedDate = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
    return formatedDate;
  }


    render(){
        return (
            <div>

            </div>
        )
    }
}