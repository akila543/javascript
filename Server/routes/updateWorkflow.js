//module imports
const fs = require('fs');
const updateWorkflow = require('express').Router();
const MongoClient = require('mongodb').MongoClient;
const yaml = require('js-yaml');

//use a middleware
updateWorkflow.use(require('body-parser').json());

// Connection URL
var url = 'mongodb://localhost:27017/workflows';

updateWorkflow.post('/workflows/update', function(req, res, next) {
    var content = yaml.safeLoad(req.body.content);
    fs.writeFile("./workflows/" + req.body.templateName,content, 'utf8', function(err) {
        if (err) {
            console.log(err);
        } else {
            next();
        }
    });
}, function(req, res) {
    //connect to mongodb
    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log('could not connect to mongodb');
        } else {
            console.log('connected');
            var template = db.collection('templates');
<<<<<<< HEAD
            template.updateOne({templateName:req.body.templateName},{$set:{content:req.body.content,transfunction:req.body.transfunction}}, function(err, result) {
=======
            template.updateOne({templateName:req.body.templateName},{$set:{content:content}}, function(err, result) {
>>>>>>> 5f7e9aaa76878e4c38d75ba4cf05edca6b01629b
                if (err) {
                    console.log(err);
                } else {
                    console.log(result.result.n);
                    res.send('Successfully updated.');
                    db.close();
                }
            });
        }
    });
});

module.exports = updateWorkflow;
