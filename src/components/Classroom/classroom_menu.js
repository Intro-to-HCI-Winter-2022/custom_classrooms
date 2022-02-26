import React, { Component } from 'react';
import MenuIcon from '@mui/icons-material/Menu';

class ClassroomMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOneDisplay: 'none',
      modalTwoDisplay: 'none',
      modalBackground: 'none',
    };
  }

  onMenuPress = (event) => {
    this.setState({ modalOneDisplay: 'inline', modalBackground: 'inline' });
  }

  onOutsidePress = (event) => {
    this.setState({ modalOneDisplay: 'none', modalTwoDisplay: 'none', modalBackground: 'none' });
  }

  onYesPress = (event) => {
    this.props.quitClassroom();
  }

  onNoPress = (event) => {
    this.setState({ modalOneDisplay: 'inline', modalTwoDisplay: 'none' });
  }

  onQuitPress = (event) => {
    this.setState({ modalOneDisplay: 'none', modalTwoDisplay: 'inline' });
  }

  render() {
    return (
      <div className="menu_button">
        <MenuIcon style={this.props.style} className="icon" onClick={this.onMenuPress} />
        <div className="menu_background" style={{ display: this.state.modalBackground }} role="region" onClick={this.onOutsidePress} />
        <div z-index={1} style={{ display: this.state.modalOneDisplay }} className="menu_pop_up">
          <div className="menu_pop_up_buttons">
            <button type="button" className="button">Account/Settings</button>
            <button type="button" onClick={this.onQuitPress} className="button">Quit Classroom</button>
          </div>
        </div>
        <div z-index={1} style={{ display: this.state.modalTwoDisplay }} className="menu_pop_up_quit">
          <p>Are you sure you want to quit?</p>
          <div className="menu_pop_up_quit_buttons">
            <button type="button" onClick={this.onNoPress} className="button">No</button>
            <button type="button" onClick={this.onYesPress} className="button">Yes</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ClassroomMenu;
