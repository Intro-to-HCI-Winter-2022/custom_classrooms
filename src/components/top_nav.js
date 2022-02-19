import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';

const TopNav = (props) => {
  return (
    <nav>
      <ul>
        <li><NavLink to="/homepage" exact>Home</NavLink></li>
        <li><NavLink to="/homepage" exact>Account</NavLink></li>
      </ul>
    </nav>
  );
};

export default withRouter(TopNav);
