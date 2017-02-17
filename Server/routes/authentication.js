const Router = require('express').Router();
const oauth = require("oauth").OAuth2;
const jwt = require('jsonwebtoken');
const Request = require('superagent');
const cookieCode ="asdywiu45r61t..26t6wgy";
const Client_ID="7342dac8b3d3acbcbe2c";
const Client_Secret="ab305c3809d3d1ed9a8c8ed0e0e54aeecc3e2e57";
const OAuth2 = new oauth(Client_ID,Client_Secret,"https://github.com/","login/oauth/authorize","login/oauth/access_token");
const secretCode = "E7r9t8@Q#h%Hy+M";

var adminList=['sagarpatke','nishauttawani','dsrini94','varun7777','rsunray','subashchandarsiva'];

Router.get('/authentication', function(req, response, next) {
  var userName;
    console.log('inside authentication');
    var code = req.query.code;
    console.log("code :"+code);
    OAuth2.getOAuthAccessToken(code,{},(err,access_token,refresh_token)=>{
      if(err)
        console.log(err);
      else
      {
        console.log(req);
        Request.get('https://api.github.com/user?access_token='+access_token).set('Accept', 'application/json')
        .end(function(err, res){
          if (err || !res.ok) {
            alert('Oh no! error');
          } else
          {
            userName=res.body.login;
            console.log(typeof userName);
		console.log(adminList.indexOf(userName));
    var encoded_accestoken = jwt.sign(access_token,secretCode);
    response.cookie("access_token",encoded_accestoken);
          if(adminList.indexOf(userName)!== -1)
          {
            response.cookie("type","admin");
            response.redirect("http://localhost:3000/#/dashboard");
          }
            else
            {
              response.cookie("type","user");
              response.redirect("http://localhost:3000/#/user");

            }
           }
          });

      }
    })

});


module.exports = Router;
