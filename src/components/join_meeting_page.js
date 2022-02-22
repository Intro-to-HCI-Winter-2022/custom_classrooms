import React, { Component } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TopNav from './top_nav';

class JoinMeetingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  onConfirmPress = (event) => {
    this.props.history.push('/classroom/1');
  }

  onBackPress = (event) => {
    this.props.history.push('/homepage');
  }

  handleEnterPress = (event) => {
    if (event.key === 'Enter') {
      this.onConfirmPress();
    }
  }

  render() {
    return (
      <div className="join_meeting_container">
        <TopNav />
        <button type="button" onClick={this.onConfirmPress} className="button">Confirm</button>
        <ArrowBackIosIcon onClick={this.onBackPress} />
      </div>
    );
  }
}

export default withRouter(connect(null, null)(JoinMeetingPage));
