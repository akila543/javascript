const rediscli = require('redis').createClient();
var connectedCount = 0;
module.exports = function(socket){
  connectedCount++;
  console.log(connectedCount+" requests sent to stageStatusRoom");
  socket.on('report-request', function(input){
      console.log(input);
      rediscli.hmget(input.jobId, input.stage, function(err, result) {
          if (err) {
              socket.emit('err', err);
          } else {
              var reply = JSON.parse(result);
              var reportObj = {
                  jobId: input.jobId,
                  stageName: input.stage,
                  status: reply.status,
                  stdout: (reply.stdout.match(/^\{|^\[/)===null)?reply.stdout:JSON.parse(reply.stdout),
                  stderr: (reply.stderr.match(/^\{|^\[/)===null)?reply.stderr:JSON.parse(reply.stderr),
                  exitCode: reply.exitCode,
                  'initializedAt': reply.ts_Initialized,
                  'scheduledAt': reply.ts_scheduled,
                  'completedAt': reply.ts_completed
              }
              socket.emit('report', reportObj);
          }
      });
  });
};
