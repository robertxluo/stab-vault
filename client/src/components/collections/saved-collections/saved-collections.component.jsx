import React, { useState, useEffect } from 'react';

import LearningPath from '../collection/collection.component';

const SavedCollections = ({ loggedInUser }) => {
  const [collections, setCollections] = useState([]);
  const currentCollections = [];

  useEffect(() => {
    // Get all collections for user

    fetch(`/api/collections/savedcollections/${loggedInUser}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          data.map((id) => fetch(`/api/collections/${id}`)
            .then((res) => res.json())
            .then((result) => {
              currentCollections.push(result);
            })
            .then(() => {
              setCollections([...currentCollections]);
            }));
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div>
      <h1>Saved Collections</h1>

      {collections[0] !== undefined ? (
        collections.map((collection) => (
          <LearningPath
            key={collection._id}
            id={collection._id}
            title={collection.title}
            description={collection.description}
            author={collection.author}
            loggedInUser={loggedInUser}
          />
        ))
      ) : (
        <li> Loading...</li>
      )}
    </div>
  );
};

export default SavedCollections;
