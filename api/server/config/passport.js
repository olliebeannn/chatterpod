import passport from 'passport';
const GoogleStrategy = require('passport-google-oauth20').Strategy;

import UserService from '../services/UserService';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  UserService.findUserById(id).then(user => done(null, user));
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.googleClientID,
      clientSecret: process.env.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, cb) => {
      // console.log(accessToken);
      // console.log('profile', profile);

      const newUser = {
        name: profile.displayName,
        email: profile.emails[0].value
      };

      if (profile.photos) {
        newUser.photo = profile.photos[0].value;
      }

      const user = await UserService.createUser(newUser);
      console.log(user);

      cb(null, user);
    }
  )
);
