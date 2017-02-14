const Router = require('express').Router();
Router.use(require('body-parser').json());
const client = require('redis').createClient();
Router.post('/jobList', function(req, res) {
  client.lrange('JOBLIST',0,-1,function(err,reply){
  	if(!err)
  	{
  		res.send(reply);
  	}
  	else
  		console.log(err);
  });
});

module.exports = Router;