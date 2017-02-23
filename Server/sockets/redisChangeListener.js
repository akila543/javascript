const getJobStatus = require('./getJobStatus');

function redisChangeListener(socket) {
    console.log('inside Listener');
    socket.on('getjobstatus', function(input) {
        console.log(input);
        getJobStatus(input.jobId,input.userId,socket);
    });
};

module.exports = redisChangeListener;
