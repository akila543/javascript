const rediscli = require('redis').createClient();
const getStageStatus = require('./getStageStatus');
const async = require('async');
const reportGen = require('./finalReportGenerator');
const updateUserActivity = require('../userServices/updateUserActivity');
function triggerReportGenerator(job, user,cb) {
    rediscli.hgetall(job + '_stages', (err, stages) => {
        if (err) {
            console.log(err);
        } else {
            if (stages === null || stages === undefined) {
                console.log('no report');
            } else {
                async.series(Object.getOwnPropertyNames(stages).map((stage) => {
                    return getStageStatus.bind(null, job, stage);
                }), function(err, result) {

                    var count = 0;
                    result.map((stage) => {
                        if (stage !== undefined && (stage.status === 'Complete' || stage.status === 'Failed'||stage.status==='Blocked')) {
                            count++;
                        }
                    });
                    if (count === 5) {
                        rediscli.hmget(job, 'status', function(err, jobStatus) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(jobStatus);
                                if (jobStatus[0] === 'Complete' || jobStatus[0] === 'Failed') {
                                    reportGen(job, result, function(err, response) {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                          console.log('repo user',user);
                                            updateUserActivity(user,job,jobStatus[0],function(){
                                              console.log('Report for ' + job + ' is ready.');
                                              cb(null,'Trigger report Updated succesfully.');
                                            });
                                        }
                                    });
                                } else {
                                  triggerReportGenerator(job, user,cb);
                                }
                            }
                        }); //end of jobstatus
                    } else {
                        triggerReportGenerator(job, user,cb);
                    }
                }); //end of async

            }
        }
    }); //end of getStageStatus calls
}
module.exports = triggerReportGenerator;
