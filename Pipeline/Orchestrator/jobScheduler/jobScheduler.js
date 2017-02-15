const async = require('async');
var client = require('redis').createClient();
var retrieveAllstages = require('./stateServices/stages/retrieveAllStages');
var updateStage = require('./stateServices/stages/updateStage');
function scheduler(input, callback) {
    istage = Object.getOwnPropertyNames(input.stageName);
    var job_count = istage.length;
    var stage_counter = 0;
    istage.map((elem) => {
        if (JSON.parse(input.stageName[elem]).status === "Complete") {
            stage_counter++;
        }
    });
    console.log("job STAGE current count is :" + stage_counter);
    if (job_count === stage_counter) {
        var temp = {
            jobId: input.jobId,
            status: 1
        };
        client.lpush('COMPLETE_RESULT', JSON.stringify(temp), function(err, reply) {
            if (!err) {
                console.log("COMPLETED DATA IS SENT");
                callback();
            } else {
                console.log(err);
            }
        })
        job_count = 0;
    }
    istage.map((item) => {
        var dstage = JSON.parse(input.stageName[item]).depends_on;
        var stageStatus = JSON.parse(input.stageName[item]).status;
        if (stageStatus === "Failed") {
            var temp = {
                jobId: input.jobId,
                status: -1
            };
            client.lpush('COMPLETE_RESULT', JSON.stringify(temp), function(err, reply) {
                if (!err) {
                    console.log("FAILED DATA SENT");
                    callback();
                } else {
                    console.log(err);
                }
            })
            istage.map((stage) => {
                var stageObj = JSON.parse(input.stageName[stage]);
                if (stageObj.depends_on !== null && stageObj.depends_on.includes(item)) {
                    stageObj.status = 'Blocked';
                    updateStage(input.jobId, stage, JSON.stringify(stageObj), function(err, res) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(input.jobId + ' ' + stage + ' is Blocked');
                        }
                    });
                }
            });
            callback();
        } else if (dstage === null && stageStatus == 'Initialized') {
            var temp = {
                jobId: input.jobId,
                stageName: item
            }
            client.lpush('STAGE_SCHEDULER', JSON.stringify(temp), function(err, reply) {
                if (!err) {
                    console.log(input.jobId + ' ' + item + ' sent');
                    callback();
                } else
                    console.log(err);
                }
            );
        } else if (dstage != null && dstage.length < 2 && stageStatus === 'Initialized') {
            if (JSON.parse(input.stageName[dstage.toString()]).status === 'Blocked') {
                var stageObj = JSON.parse(input.stageName[dstage.toString()]);
                stageObj.status = 'Blocked';
                updateStage(input.jobId, item, JSON.stringify(stageObj), function(err, res) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(input.jobId + ' ' + item + ' is Blocked');
                    }
                });
                callback();
            } else if (JSON.parse(input.stageName[dstage.toString()]).status === 'Complete') {
                if (stageStatus != 'Complete') {
                    var temp = {
                        jobId: input.jobId,
                        stageName: item
                    }
                    client.lpush('STAGE_SCHEDULER', JSON.stringify(temp), function(err, reply) {
                        if (!err) {
                            console.log(input.jobId + ' ' + item + ' sent');
                            callback();
                        } else
                            console.log(err);
                        }
                    );
                }
            }
        } else if (dstage != null && dstage.length > 1 && stageStatus === 'Initialized') {
            var dstagelen = dstage.length;

            var incr = 0;

            dstage.map((dependency) => {
                if (JSON.parse(input.stageName[dependency]).status === 'Complete') {
                    incr += 1;
                } else if (JSON.parse(input.stageName[dependency]).status === 'Blocked') {
                    var stageObj = JSON.parse(input.stageName[item]);
                    stageObj.status = 'Blocked';
                    updateStage(input.jobId, item, JSON.stringify(stageObj), function(err, res) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(item + ' is Blocked');
                        }
                    });
                }
            });
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
            } else {
                callback();
            }
        }
    });
}

module.exports = function(reply, callback) {
    if (reply != null) {
        retrieveAllstages(reply, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                var input = new Object();
                input.stageName = res;
                input.jobId = reply;
                scheduler(input, callback);
            }
        });
    }
}
