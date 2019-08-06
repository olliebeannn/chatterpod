import React from 'react';
import { NavLink } from 'react-router-dom';

import './Subnav.scss';

const Subnav = props => {
  return (
    <ul className="Subnav">
      {props.navitems.map(navitem => {
        return (
          <li className="Subnav__item" key={Math.floor(Math.random() * 100000)}>
            <NavLink to={navitem.path}>{navitem.name}</NavLink>
          </li>
        );
      })}
    </ul>
  );
};

export default Subnav;
