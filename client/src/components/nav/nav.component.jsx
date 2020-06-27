import React from 'react';
import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

import NavDropDown from '../nav-drop-down/nav-drop-down.component';

import styles from './nav.style.css';

const Nav = ({ loggedInUser, setLoggedInUser }) => (
  <header className={styles.header}>
    <nav className={styles.Nav}>
      {!loggedInUser && (
        <>
          <Link to="/">
            <button type="button" className={`${styles.NavBtn} ${styles.NavBtnHome}`}>
              Home
            </button>
          </Link>
          <Link to="/register">
            <button type="button" className={`${styles.NavBtn} ${styles.NavBtnSignUp}`}>
              Sign Up
            </button>
          </Link>
          <Link to="/login">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} type="button" className={`${styles.NavBtn} ${styles.NavBtnLogin}`}>
              Login
            </motion.button>
          </Link>
        </>
      )}
      {loggedInUser && <NavDropDown setLoggedInUser={setLoggedInUser} />}
    </nav>
  </header>
);

export default Nav;
