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
    <div className="home_page_container out">
      <TopNav />
      <div className="home_container">
        <p className="home_hint">Hey <mark className="signup">{props.username}</mark>, would you like to join, start, or design a classroom?</p>
        <nav className="home_navigation_buttons">
          <ul className="buttons">
            <li><NavLink to="/joinmeeting" exact><div className="join_logo" /></NavLink></li>
            <li><NavLink to="/homepage" exact><div className="start_logo" /></NavLink></li>
            <li><NavLink to="/homepage" exact><div className="design_logo" /></NavLink></li>
          </ul>
        </nav>
      </div>
      <button className="logout_button bottom_left" type="button" onClick={onLogOutPress}>Log Out</button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  username: state.user.username,
});

export default withRouter(connect(mapStateToProps, {
  signoutUser,
})(HomePage));
