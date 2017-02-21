const rediscli = require('redis').createClient();
const getStageStatus = require('./getStageStatus');
const async = require('async');

function getJobStatus(job, socket) {
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
                    setTimeout(() => {
                        getJobStatus(job, socket);
                    }, 2000);
                });

            }
        }
    });
}

module.exports = getJobStatus;
