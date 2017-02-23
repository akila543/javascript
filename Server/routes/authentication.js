const Router = require('express').Router();
const oauth = require("oauth").OAuth2;
const jwt = require('jsonwebtoken');
const Request = require('superagent');
const cookieCode = "asdywiu45r61t..26t6wgy";
const Client_ID = "d595532bb5ab99a235f8"; //"7342dac8b3d3acbcbe2c";
const Client_Secret = "2775d2beb0ee820fa6fb106ca378358ce4a20d1e"; //"ab305c3809d3d1ed9a8c8ed0e0e54aeecc3e2e57";
const OAuth2 = new oauth(Client_ID, Client_Secret, "https://github.com/", "login/oauth/authorize", "login/oauth/access_token");
const secretCode = "E7r9t8@Q#h%Hy+M";
const addUser = require('../userServices/addUser');

var adminList = [
    'sagarpatke',
    'NishaUttawani',
    'dsrini94',
    'varun7777',
    'rsunray',
    'subashchandarsiva',
    'karanjeet298'
];

Router.get('/authentication', function(req, response, next) {
    console.log('inside authentication');
    var code = req.query.code;
    OAuth2.getOAuthAccessToken(code, {}, (err, access_token, refresh_token) => {
        if (err)
            console.log(err);
        else {
            Request.get('https://api.github.com/user?access_token=' + access_token).set('Accept', 'application/json').end(function(err, res) {
                if (err || !res.ok) {
                    console.log(err);
                    response.send('Error in authentication.');
                } else {
                    var userName = res.body.login;
                    var id = res.body.id;
                    addUser(id,userName,res.body,function(){
                      var encoded_accestoken = jwt.sign(access_token, secretCode);
                      response.cookie("access_token", encoded_accestoken);
                      response.cookie("repos_url",res.body.repos_url);
                      if (adminList.indexOf(userName) !== -1) {
                          response.cookie("type", "admin");
                          response.redirect("http://localhost:3000/#/dashboard");
                      } else {
                          response.cookie("type", "user");
                          response.redirect("http://localhost:3000/#/user");
                      }
                    });
                }
            });

        }
    })

});

module.exports = Router;
