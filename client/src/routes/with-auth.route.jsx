import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const WithAuth = ({ Component }) => {
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch('/api/checkToken')
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        setRedirect(true);
      });
  }, []);

  if (loading) return null;
  if (redirect) {
    return <Redirect to="/login" />;
  }

  return <Component />;
};

WithAuth.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default WithAuth;
