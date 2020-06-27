import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import LearningPath from '../collection/collection.component';

const AllLearningPaths = ({ loggedInUser, userCollections }) => {
  const [collections, setCollections] = useState([]);
  const [searchText, setSearchText] = useState('');
  const { userId } = useParams();

  // transform likes to number
  const transformLikes = (colls) => colls.map((collection) => ({
    ...collection,
    likes: collection.likes.length,
  }));

  const sortByLikes = (a, b) => {
    if (a.likes > b.likes) {
      return -1;
    }
    if (a.likes === b.likes) {
      return 0;
    }
    return 1;
  };

  useEffect(() => {
    // Check if we are trying to get all collections for a specific user
    if (userCollections) {
      fetch(`/api/collections/user/${userId}`)
        .then((res) => res.json())
        .then((result) => {
          // assume result is an array
          // transformLikes -> sort by like by default
          setCollections(transformLikes(result));
        });

      return;
    }

    // Otherwise just get all collections
    fetch('/api/collections')
      .then((res) => res.json())
      .then((result) => {
        // assume result is an array
        // transformLikes -> sort by like by default
        setCollections(transformLikes(result));
      });
  }, [userId]);

  const handleSearchChange = (e) => {
    console.log(e.target.value);
    const text = e.target.value.toLowerCase();
    setSearchText(text);
  };

  const handleFilterChange = (e) => {
    const collectionCopy = [...collections];
    switch (e.target.value) {
      case 'saved':
        // TODO: decide what to do with "saved" filter
        break;
      default:
        setCollections(collectionCopy.sort(sortByLikes));
    }
  };

  const collectionsToRender = collections.filter((collection) => {
    console.log('collection', collection);
    if (collection.tags.length > 0) {
      for (let i = 0; i < collection.tags.length; i += 1) {
        if (collection.tags[i].toLowerCase().includes(searchText)) {
          return true;
        }
      }
    }
    return collection.description.toLowerCase().includes(searchText);
  });

  console.log(collectionsToRender);

  return (
    <div>
      <h1>
        {userCollections ? `${userId}'s Learning Paths` : 'All Learning Paths'}
      </h1>

      <div>
        <label htmlFor="search-input">
          <span>Search</span>
          <input id="search-input" type="text" onChange={handleSearchChange} />
        </label>
        <label htmlFor="filter-select">
          <span>Filter by:</span>
          <select
            name="filter"
            id="filter-select"
            onChange={handleFilterChange}
          >
            <option value="likes">Likes</option>
            <option value="saved">Saved</option>
          </select>
        </label>
        <label htmlFor="sort-select">
          <span>Sort by:</span>
          <select name="sort" id="sort-select">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>

      {collectionsToRender[0] !== undefined ? (
        collectionsToRender.map((collection) => (
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

export default AllLearningPaths;
