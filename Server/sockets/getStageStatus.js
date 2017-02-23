const rediscli = require('redis').createClient();
function getStageStatus(job, stage, socket, callback) {
    console.log(job + '_stages', stage);
    rediscli.hmget(job + '_stages', stage, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            var reply = JSON.parse(result[0]);
            if(stage !== 'gitClone' && stage !== 'execute' && stage !== 'code-review'){
              var reportObj = {
                  jobId: job,
                  stageName: stage,
                  status: reply.status,
                  stdout: (reply.stdout === undefined || reply.stdout.match(/^\{|^\[/) === null)
                      ? reply.stdout
                      : JSON.parse(reply.stdout),
                  stderr: (reply.stderr === undefined || reply.stderr.match(/^\{|^\[/) === null)
                      ? reply.stderr
                      : JSON.parse(reply.stderr),
                  exitCode: reply.exitCode,
                  'initialized': reply.ts_Initialized,
                  'scheduled': reply.ts_scheduled,
                  'completed': reply.ts_completed
              }
              socket.emit('report', reportObj);
            }
            setTimeout(() => {
                callback(null,reportObj);
            },1000);
        }
    });
};
module.exports = getStageStatus;
