import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import '../styles/Navbar.css';

function Navbar({ isLoggedIn, user, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <Link className="navbar-brand" to="/">
        Inicio
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul className="navbar-nav">
          {isLoggedIn ? (
            <>
              {user ? (
                <li className="nav-item">
                </li>
              ) : null}
              <li className="nav-item">
                <Logout onLogout={onLogout} className="nav-item-logout" />
              </li>
            </>
          ) : null}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;