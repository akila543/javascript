const rediscli = require('redis').createClient();
var connectedCount = 0;
module.exports = function(socket) {
  connectedCount++;
  console.log(connectedCount+" requests sent to Home");
};
