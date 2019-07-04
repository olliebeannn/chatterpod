import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
// import passport from 'passport';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

// import database from './server/src/models';
import userRoutes from './server/routes/UserRoutes';

const PORT = process.env.PORT | 5000;
const app = express();

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.googleClientID,
//       clientSecret: process.env.googleClientSecret,
//       callbackURL: '/auth/google/callback'
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       console.log(profile);
//
//       const existingUser = await database.User.create({
//         googleId: profile.id,
//         email: profile.emails[0].value
//       });
//
//       done(null, user);
//     }
//   )
// );

app.use(cors());
app.use(bodyParser.json());
// app.use(passport.initialize());
// app.use(passport.session());

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.use('/users', userRoutes);

// app.get('/auth/google', (req, res) => {
//   passport.authenticate('google', {
//     scope: ['profile', 'email']
//   });
// });
//
// app.get(
//   '/auth/google/callback',
//   passport.authenticate('google'),
//   (req, res) => {
//     res.redirect('/');
//   }
// );

app.listen(PORT, () => {
  console.log(`App up on port ${PORT}`);
});

export default app;
