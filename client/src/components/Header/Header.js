import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './Header.scss';

const Header = props => {
  const renderSignInStatus = () => {
    switch (loggedInUser) {
      case null:
        break;
      case false:
        return (
          <li className="Header__item ml-auto" key="7">
            <a href="/api/auth/google">Sign In</a>
          </li>
        );
      default:
        return (
          <>
            <li className="Header__item Header__user ml-auto" key="5">
              <div className="Header__userPhotoWrapper mr1">
                <img
                  className="Header__userPhoto"
                  src={loggedInUser.photo}
                  alt="user profile"
                />
              </div>
              {loggedInUser.name}
            </li>
            <li className="Header__item" key="6">
              <a href="/api/auth/logout">Sign Out</a>
            </li>
          </>
        );
    }
  };

  const loggedInUser = useSelector(state => state.auth);

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
        {renderSignInStatus()}
      </ul>
    </nav>
  );
};

export default Header;
