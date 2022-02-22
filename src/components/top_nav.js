import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const TopNav = (props) => {
  return (
    <nav id="top_nav_bar">
      <ul>
        <li><NavLink to="/homepage" exact>Home</NavLink></li>
        <li><NavLink to="/homepage" exact><AccountCircleIcon /></NavLink></li>
      </ul>
    </nav>
  );
};

export default withRouter(TopNav);
