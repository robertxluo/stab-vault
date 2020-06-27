// add path to DB
// modify a path that is in the DB

const express = require('express');

const router = express.Router();
const Path = require('../../models/path');
const User = require('../../models/user');

// router.get('/',
//   async (req, res) => {

//   }
// )

router.post('/',
  async (req, res) => {
    try {
      const {
        name,
        author,
        description,
        tags,
        likes,
        collections,
      } = req.body;
      const pathDetails = {};
      if (name) pathDetails.name = name;
      if (author) pathDetails.author = author;
      if (description) pathDetails.description = description;
      if (tags) pathDetails.tags = tags;
      if (likes) pathDetails.likes = likes;
      if (collections) pathDetails.collections = collections;
      const path = new Path(pathDetails);
      await path.save();
      res.json(path);
    } catch (err) {
      console.log(err);
    }
  });

module.exports = router;
