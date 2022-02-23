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
      <p>Hey <mark>{props.username}</mark>, would you like to join, start, or design a classroom?</p>
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

const mapStateToProps = (state) => ({
  username: state.user.username,
});

export default withRouter(connect(mapStateToProps, {
  signoutUser,
})(HomePage));
