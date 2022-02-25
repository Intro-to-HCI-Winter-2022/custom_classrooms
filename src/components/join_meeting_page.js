import React, { Component } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TopNav from './top_nav';
import HelpButton from './help_button';
import { getClassroom } from '../actions';

class JoinMeetingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classCode: '',
      currentView: this.props.auth ? 'ClassCode' : 'EnterName',
      joinClassName: '',
      schoolName: '',
      professor: '',
      currentStudentNumber: '',
      showCodeErrorMessage: 'none',
      unAuthUserName: '',
      showNameErrorMessage: 'none',
      topDownViewEnabled: null,
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
        professor: 'Tim',
        currentStudentNumber: '3',
        topDownViewEnabled: true,
        studentTopDownViewEnabled: false,
      });
    } else {
      this.setState({ showCodeErrorMessage: 'inline' });
    }
  }

  onNameConfirmPress = (event) => {
    if (this.state.unAuthUserName.replace(/\s/g, '').length) {
      this.setState({
        showNameErrorMessage: 'none',
        currentView: 'ClassCode',
      });
    } else {
      this.setState({ showNameErrorMessage: 'inline' });
    }
  }

  onClassroomConfirmPress = (event) => {
    if (this.state.topDownViewEnabled) {
      this.setState({ currentView: 'ToggleTopDownView' });
    } else {
      this.props.history.push(`/classroom/${this.state.classCode}`, {
        enabledTopDown: this.state.studentTopDownViewEnabled,
        unAuthName: this.state.unAuthUserName,
      });
    }
  }

  onBackPress = (event) => {
    switch (this.state.currentView) {
      case 'ClassCode':
        if (this.props.auth) {
          this.props.history.push('/homepage');
        } else {
          this.setState({ currentView: 'EnterName' });
        }
        break;
      case 'JoinInfo':
        this.setState({ currentView: 'ClassCode' });
        break;
      case 'EnterName':
        this.props.history.push('/');
        break;
      case 'ToggleTopDownView':
        this.setState({ currentView: 'JoinInfo' });
        break;
      default:
        this.props.history.push(this.props.auth ? '/homepage' : '/');
        break;
    }
  }

  onYesPress = (event) => {
    this.props.history.push(`/classroom/${this.state.classCode}`, {
      enabledTopDown: true,
      unAuthName: this.state.unAuthUserName,
      classCode: this.state.classCode,
    });
  }

  onNoPress = (event) => {
    this.props.history.push(`/classroom/${this.state.classCode}`, {
      enabledTopDown: false,
      unAuthName: this.state.unAuthUserName,
      classCode: this.state.classCode,
    });
  }

  onNameChange = (event) => {
    if (event.target.value.length <= 30) {
      this.setState({ unAuthUserName: event.target.value });
    }
  }

  handleCodeEnterPress = (event) => {
    if (event.key === 'Enter') {
      this.onCodeConfirmPress();
    }
  }

  handleNameEnterPress = (event) => {
    if (event.key === 'Enter') {
      this.onNameConfirmPress();
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
          <input type="text" pattern="[0-9]*" className="class_code_input" onChange={this.onClassCodeChange} onKeyDown={this.handleCodeEnterPress} value={this.state.classCode} />
          <button type="button" onClick={this.onClearPress} className="button">Clear</button>
          <button type="button" onClick={this.onCodeConfirmPress} className="button">Confirm</button>
          <HelpButton helpInformation="
          Your professor should have provided you this code!
          If not, ask your professor about it! They can find
          it once they are in a meeting under “Class code”.
          For demo purposes, use code 123456."
          />
          <ArrowBackIosIcon className="icon" onClick={this.onBackPress} />
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
          <button type="button" onClick={this.onReEnterPress} className="button">Re-enter Class Code</button>
          <button type="button" onClick={this.onClassroomConfirmPress} className="button">Confirm</button>
          <ArrowBackIosIcon className="icon" onClick={this.onBackPress} />
        </div>
      );
    } else if (this.state.currentView === 'EnterName') {
      return (
        <div className="enter_name_container">
          <TopNav />
          <h1>What is your name?</h1>
          <input className="enter_name_input" onChange={this.onNameChange} onKeyDown={this.handleNameEnterPress} value={this.state.unAuthUserName} />
          <button type="button" onClick={this.onNameConfirmPress} className="button">Confirm</button>
          <ArrowBackIosIcon className="icon" onClick={this.onBackPress} />
          <p style={{ display: this.state.showNameErrorMessage }}>Please enter a name.</p>
        </div>
      );
    } else if (this.state.currentView === 'ToggleTopDownView') {
      return (
        <div className="enable_top_down_view_container">
          <TopNav />
          <h1>Enable 2d top down view?</h1>
          <p>
            The host has allowed use of 2d top down view mode,
            do you want to enable it? (You can enable or disable
            it at any time during a meeting by clicking the button
            in the bottom right of your screen)
          </p>
          <button type="button" onClick={this.onNoPress} className="button">No</button>
          <button type="button" onClick={this.onYesPress} className="button">Yes</button>
          <ArrowBackIosIcon className="icon" onClick={this.onBackPress} />
        </div>
      );
    } else {
      return (
        <div className="join_info_container">
          <TopNav />
          <h1>That is weird, for some reason the page did not load properly. I guess try to reload the page, idk.</h1>
          <ArrowBackIosIcon className="icon" onClick={this.onBackPress} />
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

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
});

export default withRouter(connect(mapStateToProps, { getClassroom })(JoinMeetingPage));
