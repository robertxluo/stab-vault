import React, { useState } from 'react';

import styles from './collection-form.css';

const CollectionForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    fetch('/api/collections', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        category,
      }),
    });
  };

  return (
    <form onSubmit={handleFormSubmit} className={styles.Form}>
      <label htmlFor="title" className={styles.Label}>
        <span className={styles.LabelText}>Title: </span>
        <input type="text" id="title" onChange={handleTitleChange} value={title} />
      </label>
      <label htmlFor="description" className={styles.Label}>
        <span className={styles.LabelText}>Description: </span>
        <textarea type="text" id="description" onChange={handleDescriptionChange} value={description} />
      </label>
      <label htmlFor="category" className={styles.Label}>
        <span className={styles.LabelText}>Category:</span>
        <select name="category" id="category" onChange={handleCategoryChange}>
          <option value="">choose the category</option>
          <option value="frontend">Front End</option>
          <option value="backend">Back End</option>
          <option value="devops">Dev Ops</option>
        </select>
      </label>
      <button type="submit" className={styles.SubmitBtn}>
        Create
      </button>
    </form>
  );
};

export default CollectionForm;
