//module imports
const deleteWorkflow = require('express').Router();
const MongoClient = require('mongodb').MongoClient;

//use a parser middleware
deleteWorkflow.use(require('body-parser').json());

// Connection URL
var url = 'mongodb://localhost:27017/workflows';

//router
deleteWorkflow.post('/workflows/delete', function(req, res, next) {
    console.log("++++ Workflow delete request <<=== " + JSON.stringify(req.body) + " ===>>");
    next();
}, function(req, res, next) {
    //deleting workflow from mongodb
    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log('---- DB connection error <<=== ' + err + ' ===>>');
        } else {
            db.collection('templates').deleteOne({
                templateName: req.body.templateName
            }, function(err, result) {
                if (err) {
                    console.log('---- DB deletion error <<=== ' + err + ' ===>>');
                } else {
                    console.log("+-+- Workflow delete status(+1-0) <<=== " + result.result.n + " ===>>");
                    res.send('Successfully deleted.');
                    db.close();
                }
            }); // end of delete
        }
    }); // end of MongoClient
}); // end of router
module.exports = deleteWorkflow;
