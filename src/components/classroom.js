import React, { Component } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Classroom extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onBackPress = (event) => {
    this.props.history.push('/joinmeeting');
  }

  render() {
    return (
      <div className="classroom_container">
        <ArrowBackIosIcon onClick={this.onBackPress} />
      </div>
    );
  }
}

export default withRouter(connect(null, null)(Classroom));
