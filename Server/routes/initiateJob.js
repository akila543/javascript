const initiateJob = require('express').Router();
const initiatePipeline = require('../../Pipeline/initiatePipeline.js');
initiateJob.use(require('body-parser').json());
const MongoClient = require('mongodb').MongoClient;

//db connection url
var url = 'mongodb://localhost:27017/reports';

var client = require('redis').createClient();

initiateJob.post('/initiate', function(req, res, next) {
    console.log('inside results route');
    console.log(req.body);
    var input = {
        payload: {
            repoUrl: req.body.data
        },
        templateName: req.body.templateName
    };
    initiatePipeline(input,req.body.userName, function(err,jobId,userName) {
        MongoClient.connect(url, function(err, db) {
            if (err) {
                console.log('---- DB connection error <<=== ' + err + ' ===>>');
            } else {
                db.collection('activities').insertOne({
                    user: userName,
                    jobId: jobId,
                    repo: req.body.data,
                    initiatedAt: new Date(),
                    templateName: req.body.templateName,
                    status: "initiated",
                    report: "No report yet"
                }, function(err, result) {
                    if (err) {
                        console.log('---- DB add error <<=== ' + err + ' ===>>');
                    } else {
                        console.log("+-+- Report add status(+1-0) <<=== " + result.result.n + " ===>>");
                        db.close();
                        res.send(jobId);
                    }
                }); // end of report
            }
        }); // end of MongoClient
    });
});

module.exports = initiateJob;
