const getJobStatus = require('./getJobStatus');

function redisChangeListener(socket) {
    console.log('inside Listener');
    socket.on('getjobstatus', function(jobId) {
        console.log(jobId);
        getJobStatus(jobId, socket);
    });
};

module.exports = redisChangeListener;
