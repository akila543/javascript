const Router = require('express').Router()
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const yaml = require('js-yaml');


var url = 'mongodb://localhost:27017/workflows';

Router.use(require('body-parser').json());

Router.post('/saveFile', function(req, res, next) {
  var data = yaml.safeLoad(req.body.data);
  fs.writeFile("./workflows/"+req.body.fileName,data,'utf8', function(err) {
    if(err) {
        return console.log(err);
        }
        else
        {
    		res.send("The file was saved!");
    		MongoClient.connect(url, function(err, db) {

		    console.log("Connected successfully to server");



		    insertDocuments(db, req.body.templateName,data,req.body.transfunction ,function() {
		        db.close();
		    });

      });
		}
});

});

var insertDocuments = function(db,fileName,fileData,transfunc ,callback) {
  // Get the documents collection
  var templates = db.collection('templates');
  // Insert some documents
  templates.insertOne(
    {templateName : fileName,content : fileData, transfunction : transfunc}, function(err, result) {
    console.log(result.result.n);
    callback();
  });
}

module.exports = Router;
