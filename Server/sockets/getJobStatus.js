const rediscli = require('redis').createClient();
const getStageStatus = require('./getStageStatus');
const async = require('async');
const reportGen = require('../lib/finalReportGenerator');

function getJobStatus(job,socket) {
    socket.on('stop', function(msg) {
        console.log(msg);
        job = "";
    });
    rediscli.hgetall(job + '_stages', (err, stages) => {
        if (err) {
            console.log(err);
        } else {
            if (stages === null || stages === undefined) {
                socket.emit('report', {status: 'Monitoring Stopped'});
            } else {
                async.series(Object.getOwnPropertyNames(stages).map((stage) => {
                    return getStageStatus.bind(null, job, stage, socket);
                }), function(err, result) {
                  var count = 0;
                  result.map((stage)=>{
                    if(stage !== undefined && (stage.status === 'Complete' || stage.status === 'Failed'))
                    {
                      count++;
                    }
                  });
                  if(count === 5)
                  {
                    rediscli.hmget(job,'status',function(err,jobStatus){
                      if (err) {
                        console.log(err);
                      }
                      else {
                        console.log(jobStatus);
                          if (jobStatus[0] === 'Complete' || jobStatus[0] === 'Failed') {
                            reportGen(job,result,function(err,response){
                              if (err) {
                                console.log(err);
                              }
                              else {
                                console.log('Report for '+job+' is ready.');
                              }
                            });
                          socket.emit('report',{jobId:job,stageName:'end',status:jobStatus[0]});
                          }
                          else{
                            setTimeout(() => {
                                getJobStatus(job, socket);
                            },1000);
                          }
                      }
                    });//end of jobstatus

                  }
                  else{
                    setTimeout(() => {
                        getJobStatus(job, socket);
                    },1000);
                  }

                });//end of async
            }
        }
    });//end of getStageStatus calls
}

module.exports = getJobStatus;
