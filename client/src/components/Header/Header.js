import React from 'react';
import { NavLink } from 'react-router-dom';

import './Header.scss';

const Header = props => {
  return (
    <nav>
      <ul className="Header">
        <li className="Header__item Header__logo" key="1">
          Logo
        </li>
        <li className="Header__appName" key="2">
          <NavLink to="/podcasts">Chatterpod</NavLink>
        </li>
        <li className="Header__item" key="3">
          <NavLink to="/podcasts">Podcasts</NavLink>
        </li>
        <li className="Header__item" key="4">
          <NavLink to="/podcasts">Episodes</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
