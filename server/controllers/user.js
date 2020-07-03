const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const saltRounds = 10;
const secret = 'secret';

// ----------
// Login user
// ----------

exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    // Database error
    if (err) {
      console.error('Database error: ', err);
      return res.send({ error: 'Database error' });
    }

    // User doesn't exist
    if (!user) {
      return res.send({ error: "User doesn't exist" });
    }

    // compare passwords and make sure they match
    return bcrypt.compare(password, user.password, (bcryptError, result) => {
      if (bcryptError) {
        console.log('Bcrypt error: ', bcryptError);
        return res.send({ error: 'Bcrypt error'});
      }

      if (!result) {
        return res.send({ error: 'Incorrect password'});
      }

      // If everything went well, issue a token
      const { _id: userId } = user;
      const payload = { userId };
      const token = jwt.sign(payload, secret, { expiresIn: '1h' });
      return res
        .cookie('token', token, { httpOnly: true })
        .send({ attempt: 'success', userId });
    });
  });
};

// -------------
// Register user
// -------------

exports.registerUser = async (req, res) => {
  const { email, password } = req.body;

  // --------------------------------------------------------------
  // Check to see if somebody with that email is already registered
  // --------------------------------------------------------------

  const emailFromDb = await User.find({ email });

  if (emailFromDb.length) {
    return res.send({ emailAlreadyExists: true });
  }

  // ------------------------------------------------------------
  // No errors so far, go ahead and try to add the user to the DB
  // ------------------------------------------------------------

  // This is also possible to do with pre save hooks in mongoose
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const user = new User({ email, password: hashedPassword });

  return user
    .save()
    .then((result) => {
      console.log('User added to the DB!');

      const { _id: userId } = result;
      const payload = { userId };
      const token = jwt.sign(payload, secret, { expiresIn: '1h' });
      return res
        .cookie('token', token, { httpOnly: true, secure: true })
        .send({ registrationSuccessful: true, userId });
    })
    .catch((err) => {
      console.log('Error when saving user to DB: ', err);
      res.send({ error: err });
    });
};

// ----------
// Authenticate a user
// ----------

exports.findOneUser = async (req, res) => {
  if (res.locals.userId) {
    const user = await User.findById(res.locals.userId);
    if (user) {
      res.send({ userId: user._id });
    }
  }
};

exports.handleFbLogin = async (req, res) => {
  const { id } = req.user;
  let user;
  user = await User.findOne({ email: id }).exec();
  if (!user) {
    const hashedId = await bcrypt.hash(id, saltRounds);
    user = await new User({ email: id, password: hashedId }).save();
  }
  const { _id: userId } = user;
  const payload = { userId };
  const token = jwt.sign(payload, secret, { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true })
    .redirect('/');
};
