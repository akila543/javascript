const Router = require('express').Router()

Router.use(require('body-parser').json());

var client = require('redis').createClient();

Router.post('/results', function(req, res, next) {
  console.log('inside route');
  

    client.get('eslint',function(err,reply){
      if(!err)
        console.log(reply);
      else
        console.log(err);
    })
  	// client.lpush('JsonTemplate',JSON.stringify(req.body),function(err,reply){
  	// 	if(!err)
  	// 	{
   //      console.log(req.body)
  	// 		res.send('data is set');
  	// 	}
  	// 	else
  	// 	{
  	// 		console.log(err);
  	// 	}
  	// });
  
});

module.exports = Router;