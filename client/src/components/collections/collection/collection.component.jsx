import React from 'react';
import { Link } from 'react-router-dom';

import LikeButton from '../like-button/like-button.component';
import SaveButton from '../save-button/save-button.component';

import './collection.style.css';

const LearningPath = ({
  id, title, description, author, loggedInUser,
}) => (
  <div key={id} className="collection">
    <h1 className="collection__title">{title}</h1>
    <h3>{description}</h3>

    <div className="creator">
      <div className="creator__label">Creator:</div>
      <div className="creator__author">{author}</div>
    </div>
    <div>
      <Link to={`/collections/${id}`} className="collection__button">
        View Learing Path
      </Link>
    </div>
    {loggedInUser ? (
      <div>
        <br />
        <LikeButton loggedInUser={loggedInUser} id={id} />
        <SaveButton loggedInUser={loggedInUser} id={id} />
      </div>
    ) : (
      <div>
        <br />
        <Link to="/register">Register</Link>
        &nbsp;or&nbsp;
        <Link to="/login">Login</Link>
        &nbsp;to save this collection
      </div>
    )}
  </div>
);

export default LearningPath;
