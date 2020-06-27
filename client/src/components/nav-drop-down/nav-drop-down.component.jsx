import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import useComponentVisible from '../../hooks/useComponentVisible';

import styles from './nav-drop-down.style.css';

const NavDropDown = ({ setLoggedInUser }) => {
  const {
    ref,
    isComponentVisible,
    setIsComponentVisible,
  } = useComponentVisible(false);

  return (
    <div ref={ref} role={"menuitem"} taxindex={"1"} onClick={() => setIsComponentVisible(!isComponentVisible)}>
      <button type="button" className={styles.NavDropdownBtn}>
        <i className="fas fa-user-astronaut fa-3x" />
      </button>
      <div className={styles.NavDropdownModal}>
        {isComponentVisible && <Links setLoggedInUser={setLoggedInUser} />}
      </div>
    </div>
  );
};

const Links = ({ setLoggedInUser }) => {
  const history = useHistory();

  const logout = (e) => {
    e.preventDefault();
    fetch('/api/logout').then(() => {
      setLoggedInUser('');
      history.push('/');
    });
  };

  return (
    <>
      <Link to="/" className={styles.NavDropdownOption}>
        Home
      </Link>
      <Link to="/" className={styles.NavDropdownOption}>
        My settings
      </Link>
      <button
        type="button"
        onClick={logout}
        className={styles.NavDropdownOption}
      >
        Logout
      </button>
    </>
  );
};

export default NavDropDown;
