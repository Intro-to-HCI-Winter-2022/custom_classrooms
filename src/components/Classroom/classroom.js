import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import TileView from './2d_top_down_view/TileView';
import GameLoop from './2d_top_down_view/GameLoop';
import ClassroomMenu from './classroom_menu';
import CamerasView from './cameras_view/cameras_view';
import { getClassroom, changeSeat } from '../../actions';
import CameraView from './cameras_view/camera_view';
import HelpButton from '../help_button';

class Classroom extends Component {
  constructor(props) {
    super(props);
    this.props.getClassroom();
    // most of the output/classroom settings here is faked and simplified
    // since you need input from when the professor creates a classroom.
    this.state = {
      micOn: false,
      cameraOn: true,
      viewMode: this.props.location.state.enabledTopDown ? 'TopDown' : 'Cameras',
      allowTopDownView: true,
      showSideCameras: false,
      professorFullscreen: false,
    };
  }

  componentDidMount() {
    this.props.getClassroom(this.props.location.state.classCode);
  }

  onToggleView = (event) => {
    this.setState((pervState) => ({
      viewMode: pervState.viewMode === 'Cameras' ? 'TopDown' : 'Cameras',
    }));
  }

  onMicPress = (event) => {
    this.setState((pervState) => ({
      micOn: !pervState.micOn,
    }));
  }

  onCameraPress = (event) => {
    this.setState((pervState) => ({
      cameraOn: !pervState.cameraOn,
    }));
  }

  onProfessorPress = (event) => {
    this.setState({ professorFullscreen: true });
  }

  onBackPress = (event) => {
    this.setState({ professorFullscreen: false });
  }

  onToggleCameras = (event) => {
    this.setState((pervState) => ({
      showSideCameras: !pervState.showSideCameras,
    }));
  }

  quitClassroom = () => {
    this.props.changeSeat(-1);
    this.props.history.push(this.props.auth ? '/homepage' : '/');
  }

  renderStandardViewOrTopDown() {
    if (this.state.viewMode === 'TopDown') {
      return (
        <GameLoop className="top_down_view" onProfessorClick={this.onProfessorPress}>
          <TileView />
        </GameLoop>
      );
    } else {
      return (
        <CamerasView
          onProfessorClick={this.onProfessorPress}
          studentName={this.props.location.state.unAuthName}
          mic={this.state.micOn}
          video={this.state.cameraOn}
        />
      );
    }
  }

  renderSideCameras() {
    let key = -13;
    const cameras = this.props.participants.map((element, index) => {
      key -= 1;
      if ((index > 0) && (element !== '') && (index !== this.props.currentSeat)
      && (element !== this.props.unAuthName) && (element !== this.props.username)) {
        return (
          <div key={key} style={{ display: this.state.showSideCameras ? 'inline' : 'none' }}>
            <CameraView
              unAuthName={this.props.studentName}
              className="student_side_cam"
              mic={this.props.mic}
              video={this.props.video}
              participantName={element}
              seatNumber={index}
            />
          </div>
        );
      } else {
        return (
          <div key={key} style={{ display: 'none', position: 'absolute' }} />
        );
      }
    });
    return cameras;
  }

  render() {
    if (!this.state.professorFullscreen) {
      return (
        <div className="classroom_container">
          <div className="classroom_overlay">
            <div className="top_menu">
              <div className="top_left_menu">
                <ClassroomMenu quitClassroom={this.quitClassroom} />
                <MicIcon className="icon" style={{ display: this.state.micOn ? 'inline' : 'none' }} onClick={this.onMicPress} />
                <MicOffIcon className="icon" style={{ display: !this.state.micOn ? 'inline' : 'none' }} onClick={this.onMicPress} />
                <VideocamIcon className="icon" style={{ display: this.state.cameraOn ? 'inline' : 'none' }} onClick={this.onCameraPress} />
                <VideocamOffIcon className="icon" style={{ display: !this.state.cameraOn ? 'inline' : 'none' }} onClick={this.onCameraPress} />
                <HelpButton style={{ display: this.state.viewMode === 'Cameras' ? 'none' : 'inline' }}
                  helpInformation="Use WASD to move your character. For now, this is the only feature, but there will be more in the full build. Check out our figma to see what we mean!"
                />
              </div>
              <button
                type="button"
                style={{ display: this.state.allowTopDownView ? 'inline' : 'none' }}
                onClick={this.onToggleView}
              >
                {this.state.viewMode === 'Cameras' ? '2D Top Down View' : 'Regular Camera View'}
              </button>
            </div>
            <div className="chat_button bottom_left" role="button">
              <div className="t_chat" />
              <p>to chat</p>
            </div>
          </div>
          <div className="classroom_view">
            {this.renderStandardViewOrTopDown()}
          </div>
          <div className="choose_seat" style={{ display: (this.props.currentSeat < 0) && (this.state.viewMode === 'Cameras') ? 'inline' : 'none' }}>Choose an empty seat highlighted in blue!</div>
        </div>
      );
    } else {
      return (
        <div className="classroom_container">
          <div className="top_menu">
            <div className="top_left_menu">
              <ClassroomMenu quitClassroom={this.quitClassroom} />
              <MicIcon className="icon" style={{ display: this.state.micOn ? 'inline' : 'none' }} onClick={this.onMicPress} />
              <MicOffIcon className="icon" style={{ display: !this.state.micOn ? 'inline' : 'none' }} onClick={this.onMicPress} />
              <VideocamIcon className="icon" style={{ display: this.state.cameraOn ? 'inline' : 'none' }} onClick={this.onCameraPress} />
              <VideocamOffIcon className="icon" style={{ display: !this.state.cameraOn ? 'inline' : 'none' }} onClick={this.onCameraPress} />
            </div>
            <div className="side_cameras">
              <button id="toggle_cameras" type="button" onClick={this.onToggleCameras}>Toggle Classmate Cameras</button>
              <div className="cams">
                {this.renderSideCameras()}
              </div>
            </div>
          </div>
          <div className="shared_slide" />
          <div className="bottom_menu">
            <CameraView
              className="professor_side_cam"
              mic={this.props.mic}
              video={this.props.video}
              participantName={this.props.participants[0]}
              seatNumber={0}
            />
            <button type="button" onClick={this.onBackPress}>Back to Classroom View</button>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  currentSeat: state.classroom.seatNumber,
  participants: state.classroom.participants,
  username: state.user.username,
});

export default withRouter(connect(mapStateToProps, { getClassroom, changeSeat })(Classroom));
