//jshint esversion:6

const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

//Load User Model
const User = require("../models/User");

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email",  passwordField : "password"}, (email, password, done) => {

      // Match user
      User.findOne({
          email: email
        })
        .then(user => {
          if (!user) {
            return done(null, false, {message: "Toks el. paštas nėra registruotas"});
          }
          //Match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
              return done(null, user);

            } else {
              return done(null, false, {message: "Neteisingas slaptažodis"});
            }
          });
        });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
   User.findById(id, function(err, user) {
     done(err, user);
   });
 });
};
