const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const {googleClientID, googleClientSecret} = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user,done)=>{
    done(null,user.id);
})

passport.deserializeUser(async (id,done)=>{
    const user = await User.findById(id);
    done(null,user);
})

passport.use(new GoogleStrategy(
    {
        clientID: googleClientID,
        clientSecret: googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, async (accessToken,refreshToken, profile, done)=>{
       const foundUser = await User.findOne({googleID: profile.id}) ;
       if(!foundUser){
           const newUser = await new User ({ googleID: profile.id}).save()
           done(null,newUser);
       }else{
            done(null,foundUser);
       }
    }
))