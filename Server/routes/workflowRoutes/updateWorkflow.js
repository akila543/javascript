//module imports
const fs = require('fs');
const updateWorkflow = require('express').Router();
const MongoClient = require('mongodb').MongoClient;
const yaml = require('js-yaml');

//use a middleware
updateWorkflow.use(require('body-parser').json());

// Connection URL
var url = 'mongodb://localhost:27017/workflows';

//router
updateWorkflow.post('/workflows/update', function(req, res, next) {
    console.log("++++ Workflow update request <<=== " + JSON.stringify(req.body) + " ===>>");

    //converting the workflow to json from yaml
    req.body.content = yaml.safeLoad(req.body.content);

    //first writing it into a file for backup
    fs.writeFile("./workflows/" + req.body.templateName,req.body.content, 'utf8', function(err) {
        if (err) {
            console.log('---- File write error <<=== ' + err + ' ===>>');
        } else {
            next();
        }
    });
}, function(req, res) {
    //storing updated content to mongodb
    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log('---- DB connection error <<=== ' + err + ' ===>>');
        } else {
            db.collection('templates').updateOne({
                templateName: req.body.templateName
            }, {
                $set: {
                    content: req.body.content,
                    transFunction: req.body.transfunction
                }
            }, function(err, result) {
                if (err) {
                    console.log('---- DB update error <<=== ' + err + ' ===>>');
                } else {
                    console.log("+-+- Workflow update status(+1-0) <<=== " + result.result.n + " ===>>");
                    res.send('Successfully updated.');
                    db.close();
                }
            });// end of update
        }
    }); // end of MongoClient
});// end of router

module.exports = updateWorkflow;
