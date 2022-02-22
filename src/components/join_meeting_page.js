import React, { Component } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TopNav from './top_nav';
import HelpButton from './help_info_popup';

class JoinMeetingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classCode: '',
      currentView: 'ClassCode',
      joinClassName: '',
      schoolName: '',
      professor: '',
      currentStudentNumber: '',
      showCodeErrorMessage: 'none',
    };
  }

  onCodeConfirmPress = (event) => {
    // ideally if we would check if this class code is in the list of currently availible classrooms' codes
    // for now we just check '123456' because it is the only working classroom.
    if (this.state.classCode === '123456') {
      this.setState({ showCodeErrorMessage: 'none' });
      this.setState({ currentView: 'JoinInfo' });
      // then we would fetch the info for the particular classroom and update it here.
      // For now, we'll just fake the output.
      this.setState({
        joinClassName: 'COSC65 Smart Phone Programming',
        schoolName: 'Dartmouth College',
        professor: 'Jim',
        currentStudentNumber: '3',
      });
    } else {
      this.setState({ showCodeErrorMessage: 'inline' });
    }
  }

  onClassroomConfirmPress = (event) => {
    this.props.history.push(`/classroom/${this.state.classCode}`);
  }

  onBackPress = (event) => {
    this.props.history.push('/homepage');
  }

  handleEnterPress = (event) => {
    if (event.key === 'Enter') {
      this.onCodeConfirmPress();
    }
  }

  onClassCodeChange = (event) => {
    if (event.target.validity.valid && event.target.value.length < 7) {
      this.setState({ classCode: event.target.value });
    }
  }

  onClearPress = (event) => {
    this.setState({ classCode: '' });
  }

  onReEnterPress = (event) => {
    this.setState({
      showCodeErrorMessage: 'none',
      currentView: 'ClassCode',
      classCode: '',
    });
  }

  // used this tutorial to figure out how to only input numbers into input field.
  // https://thewebdev.info/2021/09/26/how-to-only-allow-numbers-to-be-entered-in-an-input-in-react/
  renderView() {
    if (this.state.currentView === 'ClassCode') {
      return (
        <div className="class_code_input_container">
          <TopNav />
          <h1>Enter Classroom Code</h1>
          <input type="text" pattern="[0-9]*" className="class_code_input" onChange={this.onClassCodeChange} onKeyDown={this.handleEnterPress} value={this.state.classCode} />
          <button type="button" onClick={this.onClearPress} className="button">Clear</button>
          <button type="button" onClick={this.onCodeConfirmPress} className="button">Confirm</button>
          <HelpButton helpInformation="Help" />
          <ArrowBackIosIcon onClick={this.onBackPress} />
          <p style={{ display: this.state.showCodeErrorMessage }}>A Classroom with that code does not exist!</p>
        </div>
      );
    } else if (this.state.currentView === 'JoinInfo') {
      return (
        <div className="join_info_container">
          <TopNav />
          <h1>You will join:</h1>
          <div className="join_info_body">
            <p><b>Class:</b> {this.state.joinClassName}</p>
            <p><b>School:</b> {this.state.schoolName}</p>
            <p><b>Professor:</b> {this.state.professor}</p>
            <p><b>Current Student Number:</b> {this.state.currentStudentNumber}</p>
          </div>
          <button type="button" onClick={this.onReEnterPress} className="button">Clear</button>
          <button type="button" onClick={this.onClassroomConfirmPress} className="button">Confirm</button>
          <ArrowBackIosIcon onClick={this.onBackPress} />
        </div>
      );
    } else {
      return (
        <div className="join_info_container">
          <TopNav />
          <h1>That is weird, for some reason the page did not load properly. Try going back and trying again!</h1>
          <ArrowBackIosIcon onClick={this.onBackPress} />
        </div>
      );
    }
  }

  render() {
    return (
      <div className="join_meeting_container">
        {this.renderView()}
      </div>
    );
  }
}

export default withRouter(connect(null, null)(JoinMeetingPage));
