import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';
const cookieSession = require('cookie-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

import userRoutes from './server/routes/UserRoutes';
import authRoutes from './server/routes/AuthRoutes';
import podcastRoutes from './server/routes/PodcastRoutes';
import episodeRoutes from './server/routes/episodeRoutes';

const PORT = process.env.PORT || 5000;
const app = express();

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

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/podcasts', podcastRoutes);
app.use('/api/episodes', episodeRoutes);

if (process.env.NODE_ENV === 'production') {
  // Make Express serve production assets, e.g. main.js
  app.use(express.static('client/build'));

  // Make Express serve index.html if it doesn't recognise route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '..', 'client', 'build', 'index.html')
    );
  });
}

app.listen(PORT, () => {
  console.log(`App up on port ${PORT}`);
});

export default app;
