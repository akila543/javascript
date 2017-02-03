//stage client
var client = require('redis').createClient(6379, '127.0.0.1');

var retrieveAllstages = require('./stateServices/stages/retrieveAllStages');

function scheduler(input, callback) {
    istage = Object.getOwnPropertyNames(input.stageName);
    istage.map((item) => {
        var dstage = JSON.parse(input.stageName[item]).depends_on;
        var stageStatus = JSON.parse(input.stageName[item]).status;

        if (dstage === null && stageStatus == 'Initialized') {
            var temp = {
                jobId: input.jobId,
                stageName: item
            }
            client.lpush('STAGE_SCHEDULER', JSON.stringify(temp), function(err, reply) {
                if (!err) {
                    callback();
                } else
                    console.log(err);
                }
            );
        }
        else if (dstage != null && dstage.length < 2 && stageStatus === 'Initialized' ) {
                if (JSON.parse(input.stageName[dstage.toString()]).status === 'Complete') {
                  if( stageStatus != 'Complete')
                  {
                    var temp = {
                        jobId: input.jobId,
                        stageName: item
                    }
                    client.lpush('STAGE_SCHEDULER', JSON.stringify(temp), function(err, reply) {
                        if (!err) {
                            callback();
                        } else
                            console.log(err);
                        }
                    );
                  }
                }
            }
        else if (dstage != null && dstage.length > 1 && stageStatus === 'Initialized') {
                var dstagelen = dstage.length;

                var incr = 0;

                dstage.map((item) => {
                    if (input.stageName[item].status === 'Complete')
                        incr++;
                    }
                );
                if (incr === dstagelen) {
                    var temp = {
                        jobId: input.jobId,
                        stageName: item
                    }
                    client.lpush('STAGE_SCHEDULER', JSON.stringify(temp), function(err, reply) {
                        if (!err) {
                            callback();
                        } else
                            console.log(err);
                        }
                    );
                }
            }
          else
          if(input.stageName[item].status == "Failed"){
            console.log(item+" failed");
            callback();
            //console.log(input.stageName[item].status+'===--'+item);
          }
        }
    );
}

module.exports = function(reply, callback) {
    if (reply != null) {
        var input = new Object;
        retrieveAllstages(reply,(err,res)=>{
          if (err) {
            console.log(err);
          }
          else {
              input.stageName = res;
          }
        });
        input.jobId = reply;
        scheduler(input, callback);
    }
}
