const Router = require('express').Router();
const initiatePipeline = require('../../Pipeline/initiatePipeline.js');
Router.use(require('body-parser').json());

var client = require('redis').createClient();

Router.post('/results', function(req, res, next) {
    console.log('inside results route');
    console.log(req.body);
    var input = {
        payload: {
            repoUrl: req.body.data
        },
        templateName: "CI-Pipeline"
    }
    initiatePipeline(input, function(err, reply) {
        res.send(reply);
    });
});

module.exports = Router;
