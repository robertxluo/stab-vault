import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';

import styles from './login.style.css';

const Login = ({ setLoggedInUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const [error, setError] = useState('');
  const login = async (e) => {
    e.preventDefault();
    if (!email || !password) return setError('All fields must be filled out');
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (data.error) {
      return setError(data.error);
    }
    setLoggedInUser(data.userId);
    return history.push('/');
  };

  return (
    <div className={styles.Login}>
      <div className={styles.LoginHeader}>
        <h1>Login</h1>
        {error && (
          <ul className={styles.FormError}>
            <li className={styles.FormErrorItem}>{error}</li>
          </ul>
        )}
      </div>

      <form>
        <input
          type="text"
          className="input-label__input"
          id="login-email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          className="input-label__input"
          id="login-password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit" onClick={login}>
          Login
        </motion.button>
      </form>
      <a href="/login/facebook">
        <img
          width="75%"
          alt="Continue with Facebook"
          src="https://scontent-lga3-2.xx.fbcdn.net/v/t39.2365-6/17639236_1785253958471956_282550797298827264_n.png?_nc_cat=105&_nc_sid=ad8a9d&_nc_ohc=83Ayd4oNugIAX8M4w9J&_nc_ht=scontent-lga3-2.xx&oh=bfb2cf89c4d95d4921e605c2abdff03e&oe=5F222116"
        />
      </a>
    </div>
  );
};

export default Login;
