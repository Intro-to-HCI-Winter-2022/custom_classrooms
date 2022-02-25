import React, { Component } from 'react';
import { connect } from 'react-redux';
import Webcam from 'react-webcam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import { changeSeat } from '../../../actions';

class CameraView extends Component {
  onEmptyDeskPress = (event) => {
    const { participants } = this.props;
    if (this.props.currentSeat !== -1) {
      participants[this.props.currentSeat] = '';
    }
    participants[this.props.seatNumber] = this.props.auth ? this.props.username : this.props.unAuthName;
    this.props.changeSeat(this.props.seatNumber, participants);
  }

  renderParticipantScreen() {
    const WIDTH = 241;
    const HEIGHT = 164;
    const APP_WHITE = '#E6E6E6';
    const APP_BLUE = '#32BAD8';
    // seat currently seating in
    if ((this.props.currentSeat === this.props.seatNumber)) {
      if (this.props.video) {
        return (
          <Webcam
            audio={this.props.mic}
            height={HEIGHT}
            width={WIDTH}
            videoConstraints={{
              width: WIDTH,
              height: HEIGHT,
              facingMode: 'user',
            }}
            className="camera_view"
          />
        );
      } else {
        return (
          <div className="camera_view" style={{ height: HEIGHT, width: WIDTH, backgroundColor: APP_WHITE }}>
            <VideocamOffIcon className="icon" />
            <p>You</p>
          </div>
        );
      }
    // empty seat
    } else if (this.props.participantName === '' || (this.props.participantName === this.props.username) || (this.props.participantName === this.props.unAuthName)) {
      // if choosing a seat then highlight empty seats in blue otherwise make them white
      return (
        <div className="camera_view"
          style={{
            height: HEIGHT,
            width: WIDTH,
            backgroundColor: this.props.currentSeat === -1 ? APP_BLUE : APP_WHITE,
          }}
          onClick={this.onEmptyDeskPress}
          role="button"
          tabIndex={0}
          aria-label="Empty Desk"
        />
      );
    } else {
      // camera off views
      return (
        <div
          className="camera_view"
          onClick={this.props.seatNumber === 0 ? this.props.onProfessorPress : () => {}}
          role="button"
          tabIndex={0}
          style={{ height: HEIGHT, width: WIDTH, backgroundColor: APP_WHITE }}
        >
          <VideocamOffIcon className="icon" />
          <p>{this.props.participantName}</p>
        </div>
      );
    }
  }

  render() {
    return (
      <div className={`${this.props.className}`}>{this.renderParticipantScreen()}</div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentSeat: state.classroom.seatNumber,
  participants: state.classroom.participants,
  username: state.user.username,
  auth: state.auth.authenticated,
});

export default connect(mapStateToProps, { changeSeat })(CameraView);
