const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../keys');
const mongoose = require('mongoose');
const user = mongoose.model('users');

passport.serializeUser((user, done)=>{
  done(null,user.id);
});

passport.deserializeUser((id, done)=>{
  user.findById(id)
  .then(user=>{
    done(null,user);
  });
});


passport.use(new googleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback'
}, (accessToken,refreshToken,profile,done)=>{
    console.log(profile);
    user.findOne({googleId: profile.id})
      .then((existingUser) =>{
        if(existingUser){
              done(null,existingUser);
              console.log("User exists");

        }else{

            new user({
              googleId: profile.id,
              name: profile.displayName,
              image: profile.photos[0].value})
              .save()
              .then(user =>done(null,user));

        }
      });



})
);
