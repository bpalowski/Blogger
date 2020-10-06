const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')
const Admin = require('../models/Admin')
const { v4: uuidv4 } = require('uuid');

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
      async (accessToke, refreshToken, profile, callback) => {
        const admins = await Admin.findOne({ email: profile.emails[0].value }).exec() ? true : false

        const newUser = {
          googleId: profile.id,
          email: profile.emails[0].value,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
          admin: admins
        }

        try {
          let user = await User.findOne({ googleId: profile.id })
          if (user) {

            callback(null, user)
          } else {
            user = await User.create(newUser)
            callback(null, user)
          }
        } catch (err) {
          console.error(err)
        }
      }))
  passport.serializeUser((user, callback) => {
    callback(null, user.id);
  });

  passport.deserializeUser((id, callback) => {
    User.findById(id, function (err, user) {
      callback(err, user);
    });
  })
}