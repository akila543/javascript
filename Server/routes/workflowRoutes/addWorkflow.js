//module imports
const addWorkflow = require('express').Router();
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const yaml = require('js-yaml');

//using a parser middleware
addWorkflow.use(require('body-parser').json());

//db connection url
var url = 'mongodb://localhost:27017/workflows';

//router
addWorkflow.post('/workflows/add', function(req, res, next) {
  console.log("++++ Workflow retrieveAll request <<=== " + JSON.stringify(req.body) + " ===>>");
    //converting workflow from yaml to json
    req.body.content = yaml.safeLoad(req.body.data);

    //writing workflow to a file for backup
    fs.writeFile("./workflows/" + req.body.fileName,req.body.content, 'utf8', function(err) {
        if (err) {
            return console.log(err);
        } else {
            next();
        }
    });
  }, function(req, res) {
        //storing the file to db
        MongoClient.connect(url, function(err, db) {
            if (err) {
                console.log('---- DB connection error <<=== ' + err + ' ===>>');
            } else {
                db.collection('templates').insertOne({
                    templateName: req.body.fileName,
                    content: req.body.content,
                    transFunction: req.body.transfunction
                }, function(err, result) {
                    if (err) {
                        console.log('---- DB add error <<=== ' + err + ' ===>>');
                    } else {
                        console.log("+-+- Workflow add status(+1-0) <<=== " + result.result.n + " ===>>");
                        res.send('Successfully added.');
                        db.close();
                    }
                });// end of update
            }
        }); // end of MongoClient
});// end of router

module.exports = addWorkflow;
