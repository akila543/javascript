var express = require('express');
var hub = express();
var bodyParser =require('body-parser');
var session = require('express-session');
var passport = require('passport');

var GitHubStrategy = require('passport-github2').Strategy;
var user;
hub.use(passport.initialize());
hub.use(passport.session());
hub.use(bodyParser.json());

hub.use(session({secret: 'keyboard cat', resave: true, saveUninitialized: true
}));

var GITHUB_CLIENT_ID = "7342dac8b3d3acbcbe2c";
var GITHUB_CLIENT_SECRET = "ab305c3809d3d1ed9a8c8ed0e0e54aeecc3e2e57";
console.log(GITHUB_CLIENT_ID);
//var origin = 'http://localhost:8080/#/';
var gitOpts = {
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/dashboard"
  };
var gitCallback = function(accessToken, refreshToken, profile, done){


console.log(accessToken, refreshToken, profile);
done(null,profile.id);
}
passport.use(new GitHubStrategy(gitOpts,gitCallback));

 hub.get('/dashboard',passport.authenticate('github',{
   successRedirect: 'http://localhost:8080/#/dashboard',
   failureRedirect: 'http://localhost:8080/#/',
   failureFlash: true,
   session: false
 }));
// hub.get('/logout', function(req, res){
//   res.clearCookie('userid');
// });
hub.listen(3000);
module.exports = hub;
