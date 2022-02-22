import React, { Component } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import GameLoop from './2d_top_down_view/GameLoop';
import TileView from './2d_top_down_view/TileView';

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
        <GameLoop>
          <TileView />
        </GameLoop>
      </div>
    );
  }
}

export default withRouter(connect(null, null)(Classroom));
