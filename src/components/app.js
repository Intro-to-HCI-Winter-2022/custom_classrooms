import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import SignInAndUp from './signInAndUp';
import LandingPage from './landing_page';
import HomePage from './home_page';
import JoinMeetingPage from './join_meeting_page';
import Classroom from './Classroom/classroom';

const FallBack = (props) => {
  return <div>URL Not Found</div>;
};

const App = (props) => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/signin" component={SignInAndUp} />
          <Route path="/signup" component={SignInAndUp} />
          <Route path="/homepage" component={HomePage} />
          <Route path="/joinmeeting" component={JoinMeetingPage} />
          <Route exact path="/classroom/:id" component={Classroom} />
          <Route component={FallBack} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
