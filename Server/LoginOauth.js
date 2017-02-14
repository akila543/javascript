const express = require('express'),
    app = express(),
    server = require('http').Server(app);
var path = require('path');
var oauth = require("oauth").OAuth2;
var OAuth2 = new oauth("58edf1ba4d5ee26c7673", "71d2b7dd09f7086f4422b70c077ab4b5d089ef9c", "https://github.com/", "login/oauth/authorize", "login/oauth/access_token");

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get('/dashboard', function(req, res) {
    var code = req.query.code;
    var token="";
    OAuth2.getOAuthAccessToken(code, {}, function(err, access_token) {
        if (err) {
            console.log(err);
        }
        accessToken = access_token;
        // authenticate github API
        console.log("AccessToken: " + accessToken + "\n");

        var payload = accessToken;
        var secretkey = "ourbobapplication";
        res.redirect("http://localhost:8080/#/dashboard");

});
});
server.listen(3000, function() {
    console.log('server===3000');
});
module.exports = app;
