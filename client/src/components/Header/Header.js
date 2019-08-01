import React from 'react';
import { NavLink } from 'react-router-dom';

import './Header.scss';

const Header = props => {
  return (
    <nav>
      <ul className="Header">
        <li className="Header__item Header__appName" key="2">
          <NavLink to="/" exact>
            Chatterpod
          </NavLink>
        </li>
        <li className="Header__item" key="3">
          <NavLink to="/podcasts">Podcasts</NavLink>
        </li>
        <li className="Header__item" key="4">
          <NavLink to="/episodes">Episodes</NavLink>
        </li>
        <li className="Header__item" key="6">
          <a href="/api/auth/google">Sign In</a>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
