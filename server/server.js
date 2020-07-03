const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const passport = require('passport');

const userController = require('./controllers/user');
require('./controllers/user');
require('./controllers/passportUser');
const verifyToken = require('./utils/verifyToken');

const app = express();
const PORT = process.env.PORT || 5000;

// Dotenv
dotenv.config();

// ------
// Routes
// ------

app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
app.use(express.json({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// facebook routes
app.get('/login/facebook',
  passport.authenticate('facebook'));
app.get('/login/facebook/return',
  passport.authenticate('facebook', {
    failureRedirect: '/signup',
  }),
  userController.handleFbLogin,
  (req, res) => {
    res.redirect('/login');
  });

// other routes
app.post('/api/register', userController.registerUser);
app.post('/api/login', userController.loginUser);
app.get('/api/logout', (req, res) => {
  res.cookie('token', null).send();
});
// Used to check if the users token is valid
// Allows us to protect routes on the client side
app.get('/api/checkToken', verifyToken, userController.findOneUser);

// Collection routes
app.use('/api/collections', require('./routes/api/collections'));

// Path routes
app.use('/api/paths', require('./routes/api/paths'));

// Userpath routes
app.use('/api/userpaths', require('./routes/api/userpaths'));

// Let React handle all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});

// -------------
// Connect to DB
// Then start server
// -----------------

mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
  });
});
