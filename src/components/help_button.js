import React, { Component } from 'react';
import HelpIcon from '@mui/icons-material/Help';

class HelpButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalDisplay: 'none',
    };
  }

  onHelpPress = (event) => {
    this.setState({ modalDisplay: 'inline' });
  }

  onConfirmPress = (event) => {
    this.setState({ modalDisplay: 'none' });
  }

  render() {
    return (
      <div className="help_button">
        <HelpIcon style={this.props.style} className="icon help_button" onClick={this.onHelpPress} />
        <div className="help_background" style={{ display: this.state.modalDisplay }} role="region" onClick={this.onConfirmPress} />
        <div z-index={1} style={{ display: this.state.modalDisplay }} className="help_pop_up">
          <div className="help_info_container">
            <h1 className="help_title">Help Information</h1>
            <p>{this.props.helpInformation}</p>
            <button type="button" onClick={this.onConfirmPress} className="ok_button">Okay!</button>
          </div>
        </div>
      </div>
    );
  }
}

export default HelpButton;
