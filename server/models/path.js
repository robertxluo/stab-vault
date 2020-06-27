const mongoose = require('mongoose');

const { Schema } = mongoose;

const pathSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: [{ type: String }],
  likes: [{ type: String }],
  collections: [{ type: String }],
});

module.exports = mongoose.model('Paths', pathSchema);
