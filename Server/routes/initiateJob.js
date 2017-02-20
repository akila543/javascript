const initiateJob = require('express').Router();
const initiatePipeline = require('../../Pipeline/initiatePipeline.js');
initiateJob.use(require('body-parser').json());

var client = require('redis').createClient();

initiateJob.post('/initiate', function(req, res, next) {
    console.log('inside results route');
    console.log(req.body);
    var input = {
        payload: {
            repoUrl: req.body.data
        },
        templateName: req.body.templateName.split('.')[0]
    };
    initiatePipeline(input,req.body.userName,function(err, reply) {
        res.send(reply);
    });
});

module.exports = initiateJob;
