import React from 'react';
import { Link } from 'react-router-dom';

import NavDropDown from '../nav-drop-down/nav-drop-down.component';

import styles from './nav.style.css';

const Nav = ({ loggedInUser, setLoggedInUser }) => (
  <header className={styles.header}>
    <nav className={styles.Nav}>
      {!loggedInUser && (
        <>
          <Link to="/">
            <button
              type="button"
              className={`${styles.NavBtn} ${styles.NavBtnHome}`}
            >
              Home
            </button>
          </Link>
          <Link to="/register">
            <button
              type="button"
              className={`${styles.NavBtn} ${styles.NavBtnSignUp}`}
            >
              Sign Up
            </button>
          </Link>
          <Link to="/login">
            <button
              type="button"
              className={`${styles.NavBtn} ${styles.NavBtnLogin}`}
            >
              Login
            </button>
          </Link>
        </>
      )}
      {loggedInUser && <NavDropDown setLoggedInUser={setLoggedInUser} />}
    </nav>
  </header>
);

export default Nav;
