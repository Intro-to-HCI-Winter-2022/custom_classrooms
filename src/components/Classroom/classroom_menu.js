import React, { Component } from 'react';
import MenuIcon from '@mui/icons-material/Menu';

class ClassroomMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalDisplay: 'none',
    };
  }

  onMenuPress = (event) => {
    this.setState({ modalDisplay: 'inline' });
  }

  onOutsidePress = (event) => {
    this.setState({ modalDisplay: 'none' });
  }

  onQuitPress = (event) => {
    this.props.quitClassroom();
  }

  render() {
    return (
      <div className="menu_button">
        <MenuIcon style={this.props.style} className="icon" onClick={this.onMenuPress} />
        <div className="menu_background" style={{ display: this.state.modalDisplay }} role="region" onClick={this.onOutsidePress} />
        <div z-index={1} style={{ display: this.state.modalDisplay }} className="menu_pop_up">
          <button type="button" className="button">Account/Settings</button>
          <button type="button" onClick={this.onQuitPress} className="button">Quit Classroom</button>
        </div>
      </div>
    );
  }
}

export default ClassroomMenu;
