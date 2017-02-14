const Router = require('express').Router()
var fs = require('fs');
Router.use(require('body-parser').json());

Router.post('/saveFile', function(req, res, next) {
  console.log('inside route');
  fs.writeFile("./workflows/"+req.body.fileName, req.body.data,'utf8', function(err) {
    if(err) {
        return console.log(err);
        }
    res.send("The file was saved!");
});

});

module.exports = Router;
