import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// import database from './server/src/models';
import userRoutes from './server/routes/UserRoutes';

const PORT = process.env.PORT | 5000;
const app = express();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.googleClientID,
      clientSecret: process.env.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log(accessToken);
    }
  )
);

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.get('/auth/google', (req, res) => {
  passport.authenticate('google', {
    scope: ['profile', 'email']
  });
});

app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`App up on port ${PORT}`);
});

export default app;
