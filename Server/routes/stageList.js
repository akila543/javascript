//module imports
const stageListReqHandler = require('express').Router();
const client = require('redis').createClient();

//use a middleware
stageListReqHandler.use(require('body-parser').json());//{jobId:abc_1}

stageListReqHandler.post('/stages',function(req,res,next){
  console.log(req.body);
  next();
},function(req,res,next){
  var jobId = req.body.jobId;
  client.hgetall(jobId+"_stages",(err,result)=>{
      if (err) {
        console.log(err);
      }
      else {
        var stages = Object.keys(result);
        res.send(stages.map(function(stage){
          var response = new Object();
          if(JSON.parse(result[stage]).status === "Complete"){
            response[stage] = JSON.parse(result[stage]);
            return response;
          }
          else{
            response[stage] ={'status':JSON.parse(result[stage]).status};
            return response;
          }
        }));
      }
  });
}
);

module.exports = stageListReqHandler;
