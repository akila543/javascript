//module imports
const redis = require('redis');

//get message from queue
function getMessage(cli,q,w){
  cli.brpop(q,0,function(err,reply){
    if(err){
      console.log(err);
    }
    else{
      //call the worker with the queue output and add recursive callaback to the get message
        w(reply[1],function(){
          getMessage(cli,q,w);
        });
      }
  });
};

//api export
module.exports = function(qName,worker){
    const client= redis.createClient(6379,'127.0.0.1');
    getMessage(client,qName,worker);
};
