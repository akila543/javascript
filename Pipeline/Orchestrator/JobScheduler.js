//module imports
const async = require('async');
//stage client
var client = require('redis').createClient(6379, '127.0.0.1');

var retrieveAllstages = require('./stateServices/stages/retrieveAllStages');
var updateStage = require('./stateServices/stages/updateStage');

function scheduler(input, callback) {
    istage = Object.getOwnPropertyNames(input.stageName);
    istage.map((item) => {
        var dstage = JSON.parse(input.stageName[item]).depends_on;
        var stageStatus = JSON.parse(input.stageName[item]).status;

        if (stageStatus === "Failed") {
            console.log('Stage Failed');
            istage.map((stage) => {
                var stageObj = JSON.parse(input.stageName[stage]);
                if (stageObj.depends_on !== null && stageObj.depends_on.includes(item)) {
                    stageObj.status = 'Blocked';
                    updateStage(input.jobId, stage, JSON.stringify(stageObj), function(err, res) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(stage + ' is Blocked');
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
                        console.log(stage + ' is Blocked');
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
                            console.log(stage + ' is Blocked');
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
