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
    // TODO: pass something back to the front-end to let the client know a DB error occured
    if (err) {
      console.error('Database error: ', err);
      return res.redirect('/login');
    }

    // User doesn't exist
    // TODO: pass something back to let the front-end know that user doesn't exist
    if (!user) {
      console.log("User doesn't exist");
      return res.redirect('/login');
    }

    // compare passwords and make sure they match
    return bcrypt.compare(password, user.password, (bcryptError, result) => {
      // TODO: let the front-end know that bcrypt ran into an error
      if (bcryptError) {
        console.log('Bcrypt error: ', bcryptError);
        return res.redirect('/login');
      }

      // TODO: let the client know the password is incorrect
      if (!result) {
        console.log('Incorrect password');
        return res.redirect('/login');
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
