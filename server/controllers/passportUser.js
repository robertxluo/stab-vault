const passport = require('passport');
const dotenv = require('dotenv');

const FacebookStrategy = require('passport-facebook').Strategy;

dotenv.config();
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: '/login/facebook/return',
    },
    async (accessToken, refreshToken, profile, done) => {
      done(null, profile);
    },
  ),
);
