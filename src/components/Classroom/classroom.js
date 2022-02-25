import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import TileView from './2d_top_down_view/TileView';
import GameLoop from './2d_top_down_view/GameLoop';
import HelpButton from '../help_button';
import ClassroomMenu from './classroom_menu';
import CamerasView from './cameras_view/cameras_view';
import { getClassroom } from '../../actions';

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
    this.props.history.push(`/professorfullscreen/${this.props.location.state.classCode}`);
  }

  quitClassroom = () => {
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
            <HelpButton style={{ display: this.state.viewMode === 'Cameras' ? 'none' : 'inline' }}
              helpInformation="-Use WASD to move your character(blue hat).
          -Try moving to a seat and pressing F to sit down and view the lecture."
            />
          </div>
          <button
            type="button"
            style={{ display: this.state.allowTopDownView ? 'inline' : 'none' }}
            onClick={this.onToggleView}
          >
            {this.state.viewMode === 'Cameras' ? '2D Top Down View' : 'Regular Camera View'}
          </button>
          <div className="chat_button" role="button">
            <div className="t_chat" />
            <p>to chat</p>
          </div>
        </div>
        <div className="classroom_view">
          {this.renderStandardViewOrTopDown()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
});

export default withRouter(connect(mapStateToProps, { getClassroom })(Classroom));
