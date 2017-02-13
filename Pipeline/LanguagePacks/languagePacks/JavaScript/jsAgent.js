//core module imports
const spawn = require('child_process').spawn;

//script specific modules
const redis = require('redis');

//reading the input from the stage queue
var stageAgent = redis.createClient();

//stage handler
module.exports = function(reply,callback){
            var ipl = JSON.parse(reply);
            var result = {
                jobId: ipl.jobId,
                stageName: ipl.stageName,
                stdout: '',
                stderr: '',
                exitCode: '',
                stageStatus:'IN PROGRESS',
            };
            ipl.input.ID = ipl.jobId;
            console.log(ipl.cmd);
            try{
            var res = spawn('/'+ipl.cmd, {
                cwd: '/tmp/',
                env: ipl.input,
            });
            res.stdout.on('data', (data) => {
              console.log(ipl.jobId+" "+result.stageName+' stdout=====>',` ${data}`);
                result.stdout = `${data}`;
            });

            res.stderr.on('data', (data) => {
              console.log(ipl.jobId+" "+result.stageName+' stderr=====>',`${data}`);
                result.stderr = `${data}`;
            });

            res.on('close', (code) => {
                console.log(ipl.jobId+" "+result.stageName+` process exited with code ${code}`);
                result.exitCode = code;
                stageAgent.lpush('results', JSON.stringify(result),function(err,reply){
                  callback();
                });
            });
          }catch(e){
            console.log(e);
            callback();
          }
};
