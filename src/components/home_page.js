import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import TopNav from './top_nav';
import { signoutUser } from '../actions';

const HomePage = (props) => {
  const onLogOutPress = (event) => {
    props.signoutUser(props.history);
  };

  return (
    <div className="home_page_container">
      <TopNav />
      <nav className="home_navigation_buttons">
        <ul>
          <li><NavLink to="/joinmeeting" exact>Join</NavLink></li>
          <li><NavLink to="/homepage" exact>Start</NavLink></li>
          <li><NavLink to="/homepage" exact>Design</NavLink></li>
        </ul>
      </nav>
      <button type="button" onClick={onLogOutPress}>Logout</button>
    </div>
  );
};

export default withRouter(connect(null, {
  signoutUser,
})(HomePage));
