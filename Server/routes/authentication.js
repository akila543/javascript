const Router = require('express').Router();
const oauth = require("oauth").OAuth2;
const jwt = require('jsonwebtoken');
const Request = require('superagent');
const cookieCode ="asdywiu45r61t..26t6wgy";
const Client_ID="f04e898ce84f9ea04158";
const Client_Secret="9e7ca663c2b53b83b0c6453a26cd17fe4a23507f";
const OAuth2 = new oauth(Client_ID,Client_Secret,"https://github.com/","login/oauth/authorize","login/oauth/access_token");
const at = "ihtlto1a2wmfVaA.";
const secretCode = "E7r9t8@Q#h%Hy+M";

var adminList=['sagarpatke','kritiraj','nishauttawani','dsrini94','varun7777','rsunray','subashchandarsiva'];

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
             var encoded_accestoken = jwt.sign(cookieCode,secretCode);
            response.cookie("access_token",encoded_accestoken);
		console.log(adminList.indexOf(userName));
          if(adminList.indexOf(userName)!== -1)
                response.redirect("http://172.23.238.228:3000/#/monitor");
            else
                response.redirect("http://172.23.238.228:3000/#/user");
           }
          });

      }
    })

});


module.exports = Router;
