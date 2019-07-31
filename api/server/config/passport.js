import passport from 'passport';
const GoogleStrategy = require('passport-google-oauth20').Strategy;

import UserService from '../services/UserService';

passport.serializeUser((user, done) => {
  done(null, user.userId);
});

passport.deserializeUser((userId, done) => {
  UserService.findUserById(userId).then(user => done(null, user));
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.googleClientID,
      clientSecret: process.env.googleClientSecret,
      callbackURL: '/api/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, cb) => {
      const newUser = {
        name: profile.displayName,
        email: profile.emails[0].value
      };

      if (profile.photos) {
        newUser.photo = profile.photos[0].value;
      }

      const existingUser = await UserService.findUserByEmail(newUser.email);

      if (existingUser) {
        cb(null, existingUser);
      } else {
        const user = await UserService.createUser(newUser);
        cb(null, user);
      }
    }
  )
);
