//core module imports
const spawn = require('child_process').spawn;

//script specific modules
const redis = require('redis');

//reading the input from the stage queue
var stageAgent = redis.createClient(6379,'127.0.0.1');

//worker for stage queue
module.exports = function(reply,callback){
      //// get the output from the queue
      var ipl = JSON.parse(reply);
      ////the output object
      var result = {
        jobId: ipl.jobId,
        stageName: ipl.stageName,
        stdout: '',
        stderr: '',
        exitCode: '',
        stageStatus:'IN PROGRESS',
      };
      try{
      ipl.input.ID = ipl.jobId;
      //// run the appropriate script
      var res = spawn("/"+ipl.cmd,{cwd:'/tmp/',env:ipl.input});
      //// send the exit code as response to the result processor
      res.on('close',(code)=>{
        console.log(ipl.jobId+` process exited with code ${code}`);
        result.exitCode = code;
        stageAgent.lpush('results',JSON.stringify(result),function(err,reply){
          if (err) {
            console.log(err);
          }
          else {
            callback();
          }
        });
      });
    }catch(e){
      console.log('some error occured');
    }
};
