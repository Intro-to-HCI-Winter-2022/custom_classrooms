import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import MenuIcon from '@mui/icons-material/Menu';
import Webcam from 'react-webcam';
import TileView from './2d_top_down_view/TileView';
import GameLoop from './2d_top_down_view/GameLoop';
import HelpButton from '../help_button';

class Classroom extends Component {
  constructor(props) {
    super(props);
    // most of the output/classroom settings here is faked and simplified
    // since you need input from when the professor creates a classroom.
    this.state = {
      micOn: false,
      cameraOn: false,
      viewMode: 'Cameras',
      allowTopDownView: false,
      enableTopDownView: false,
    };
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

  renderStandardViewOrTopDown() {
    if (this.state.enableTopDownView) {
      return (
        <GameLoop className="classroom_view">
          <TileView />
        </GameLoop>
      );
    } else {
      return (
        <div className="classroom_view">
          <Webcam audio={this.state.micOn} height={100} width={100} />
        </div>
      );
    }
  }

  render() {
    return (
      <div className="classroom_container">
        <div className="classroom_overlay" style={{ position: 'fixed' }}>
          <div className="top_left_menu">
            <MicIcon z-index={1} className="icon" style={{ display: this.state.micOn ? 'inline' : 'none' }} onClick={this.onMicPress} />
            <MicOffIcon z-index={1} className="icon" style={{ display: !this.state.micOn ? 'inline' : 'none' }} onClick={this.onMicPress} />
            <VideocamIcon className="icon" style={{ display: this.state.cameraOn ? 'inline' : 'none' }} onClick={this.onCameraPress} />
            <VideocamOffIcon className="icon" style={{ display: !this.state.cameraOn ? 'inline' : 'none' }} onClick={this.onCameraPress} />
            <MenuIcon className="icon" onClick={this.onBackPress} />
            <HelpButton helpInformation="-Use WASD to move your character(blue hat).
          -Try moving to and clicking on an open desk.
          -To see the professor’s screen, be seated and click the professor.
          -Press T to type to everyone."
            />
          </div>
          <button
            type="button"
            style={{ display: this.state.allowTopDownView ? 'inline' : 'none' }}
            onClick={this.onToggleView}
          >
            {this.state.viewMode === 'Cameras' ? '2D Top Down View' : 'Regular Camera View'}
          </button>
          <div className="chat_button">
            <div className="T" />
            <p>to chat</p>
          </div>
        </div>
        {this.renderStandardViewOrTopDown()}
      </div>
    );
  }
}

export default withRouter(connect(null, null)(Classroom));
