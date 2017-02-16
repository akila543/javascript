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
        templateName: req.body.templateName
    }
    initiatePipeline(input, function(err, reply) {
        console.log('final reply======================================>>>>>',reply);
        res.send(reply);
    });
});

module.exports = Router;
