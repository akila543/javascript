const Router = require('express').Router();
const oauth = require("oauth").OAuth2;
const OAuth2 = new oauth("f04e898ce84f9ea04158","9e7ca663c2b53b83b0c6453a26cd17fe4a23507f","https://github.com/","login/oauth/authorize","login/oauth/access_token");
const jwt = require('jsonwebtoken');
const Client_ID="f04e898ce84f9ea04158";
const Client_Secret="9e7ca663c2b53b83b0c6453a26cd17fe4a23507f";
const secretCode = "E7r9t8@Q#h%Hy+M";

Router.get('/authentication', function(req, res, next) {
    console.log('inside authentication');
    var code = req.query.code;
    console.log("code :"+code);
    OAuth2.getOAuthAccessToken(code,{},(err,access_token,refresh_token)=>{
      if(err)
        console.log(err);
      else
      {
        console.log(access_token);
        var encoded_accestoken = jwt.sign(access_token,secretCode);
        res.cookie("access_token",encoded_accestoken);
        res.redirect("http://localhost:3000/#/monitor");
      }
    })

});


module.exports = Router;
