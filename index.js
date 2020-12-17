// "C:\Program Files\MongoDB\Server\4.4\bin\mongo.exe"

const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require('cookie-session');
const {cookieKEY} = require('./config/keys');
const passport = require('passport'); 
require('./models/Users');
require('./services/passport');

mongoose.connect("mongodb://localhost:27017/EFeed_DB",
 { useNewUrlParser: true, useUnifiedTopology: true }) //reconfig

const app = express();

app.use(
    cookieSession({
        maxAge: 30*24*60*60*1000,
        keys: [cookieKEY]
    })
)

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT,(req,res)=>{
    console.log('Server is ruuning')
})