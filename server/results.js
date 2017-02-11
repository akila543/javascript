const Router = require('express').Router()
const initiatePipeline = require('../Pipeline/initiatePipeline.js');
Router.use(require('body-parser').json());

var client = require('redis').createClient();

Router.post('/results', function(req, res, next) {
  console.log('inside route');
  

    client.get('eslint',function(err,reply){
      if(!err)
      {
        var input = {
          payload:{
            repoUrl:req.body.data
                  },
          templateName:"CI-Pipeline"
                   }

        initiatePipeline(input,function(err,reply){
          res.send(reply);
        });
        
      }
      else
        console.log(err);
    });
  
});

module.exports = Router;