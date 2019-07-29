import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';
const cookieSession = require('cookie-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// import database from './server/src/models';
// import UserService from './server/services/UserService';
import userRoutes from './server/routes/UserRoutes';
import authRoutes from './server/routes/AuthRoutes';
import podcastRoutes from './server/routes/PodcastRoutes';

const PORT = process.env.PORT || 5000;
const app = express();

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });
//
// passport.deserializeUser((id, done) => {
//   UserService.findUserById(id).then(user => done(null, user));
// });
//
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.googleClientID,
//       clientSecret: process.env.googleClientSecret,
//       callbackURL: '/auth/google/callback'
//     },
//     async (accessToken, refreshToken, profile, cb) => {
//       // console.log(accessToken);
//       // console.log('profile', profile);
//
//       const newUser = {
//         name: profile.displayName,
//         email: profile.emails[0].value
//       };
//
//       if (profile.photos) {
//         newUser.photo = profile.photos[0].value;
//       }
//
//       const user = await UserService.createUser(newUser);
//       console.log(user);
//
//       cb(null, user);
//     }
//   )
// );

app.use(cors());
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.cookieKey]
  })
);

// passport config
import './server/config/passport';
app.use(passport.initialize());
app.use(passport.session());

// test route from home
app.get('/', (req, res) => {
  res.send('Hello world!');
});

// app.get(
//   '/auth/google',
//   passport.authenticate('google', {
//     scope: ['profile', 'email']
//   })
// );
//
// app.get(
//   '/auth/google/callback',
//   passport.authenticate('google'),
//   (req, res) => {
//     res.redirect('/');
//   }
// );

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/podcasts', podcastRoutes);

if (process.env.NODE_ENV === 'production') {
  // Make Express serve production assets, e.g. main.js
  app.use(express.static('client/build'));

  // Make Express serve index.html if it doesn't recognise route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`App up on port ${PORT}`);
});

export default app;
