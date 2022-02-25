import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import ClassroomMenu from './classroom_menu';
import { getClassroom } from '../../actions';

class ProfessorFullscreen extends Component {
  constructor(props) {
    super(props);
    this.props.getClassroom();
    // most of the output/classroom settings here is faked and simplified
    // since you need input from when the professor creates a classroom.
    this.state = {
      micOn: false,
      cameraOn: true,
      showCameras: false,
    };
  }

  componentDidMount() {
    this.props.getClassroom();
  }

  onBackPress = (event) => {

  }

  onToggleCameras = (event) => {
    this.setState((pervState) => ({
      showCameras: !pervState.showCameras,
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

  quitClassroom = () => {
    this.props.history.push(this.props.auth ? '/homepage' : '/');
  }

  render() {
    return (
      <div className="classroom_container">
        <div className="classroom_overlay">
          <div className="top_left_menu">
            <MicIcon className="icon" style={{ display: this.state.micOn ? 'inline' : 'none' }} onClick={this.onMicPress} />
            <MicOffIcon className="icon" style={{ display: !this.state.micOn ? 'inline' : 'none' }} onClick={this.onMicPress} />
            <VideocamIcon className="icon" style={{ display: this.state.cameraOn ? 'inline' : 'none' }} onClick={this.onCameraPress} />
            <VideocamOffIcon className="icon" style={{ display: !this.state.cameraOn ? 'inline' : 'none' }} onClick={this.onCameraPress} />
            <ClassroomMenu quitClassroom={this.quitClassroom} />
          </div>
          <button type="button" onClick={this.onToggleView}>Toggle Classmate Cameras</button>
          <button type="button" onClick={this.onToggleView}>Back to Classroom View</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
});

export default withRouter(connect(mapStateToProps, { getClassroom })(ProfessorFullscreen));
