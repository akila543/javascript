const Router = require('express').Router();
Router.use(require('body-parser').json());
const client = require('redis').createClient();
Router.post('/jobList', function(req, res) {
  client.lrange('JOBLIST',0,-1,function(err,reply){
  	if(!err)
  	{
  		res.send(reply.map((job)=>{
        client.hgetall(job,'status',(err,result)=>{
          if (err) {
            console.log(err);
          }
          else {
            return {jobId:job,status:result};
          }
        })
      }));
  	}
  	else
  		console.log(err);
  });
});

module.exports = Router;
