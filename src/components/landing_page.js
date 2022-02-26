import React from 'react';
import { withRouter } from 'react-router-dom';

const LandingPage = (props) => {
  const onJoinPress = (event) => {
    props.history.push('/joinmeeting');
  };

  const onSignInPress = (event) => {
    props.history.push('/signin');
  };

  return (
    <div className="landing_page_container">
      <div className="logo big_logo mainpage_logo" />
      <div className="landing_page_buttons">
        <button type="button" className="button" onClick={onJoinPress}>Join A Classroom</button>
        <button type="button" className="button" onClick={onSignInPress}>Sign In</button>
      </div>
    </div>
  );
};

export default withRouter(LandingPage);
