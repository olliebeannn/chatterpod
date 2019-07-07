import { Router } from 'express';
import passport from 'passport';
// const GoogleStrategy = require('passport-google-oauth20').Strategy;

// import UserService from '../services/UserService';
// import Util from '../utils/Util';

const router = Router();
// const util = new Util();

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  res.redirect('/');
});

export default router;
