const redis = require('redis');
const async = require('async');

//creating client
var stageScheduler = redis.createClient();
var retrievePayload = require('./stateServices/payload/retrievePayload');
var retrieveStage = require('./stateServices/stages/retrieveStage');
var retrieveResources = require('./stateServices/resources/retrieveResources');
var updateStage = require('./stateServices/stages/updateStage');

//Updating status and ts_scheduled for stage
function updateStatus(jobId, stageName, callback) {
    retrieveStage(jobId, stageName,function(err,res){
      if (err) {
        console.log(err);
      }
      else {
        console.log(res);
        var stages = JSON.parse(res[0]);
        var comand = stages.type;
        var status = stages.status;
        var input = stages.input;
        if (status == "Initialized") {
            stages.status = "Scheduled";
            //updating status and ts_scheduled in redis
            stages.ts_scheduled = new Date();
            console.log("changed status");
            updateStage(jobId, stageName, JSON.stringify(stages),function(err,res){
              if (err) {
                console.log(err);
              }
              else {
                console.log("update stage");
                schedule(jobId, stageName, input, comand, callback);
              }
            });
        }
      }
    });
}

function schedule(jobId, stageName, input_stages, comand, callback) {
    var temparr = comand.split('/');
    var queueName = temparr[1] + '/' + temparr[2];
    console.log("queuename",queueName);
    if (comand === "/stackroute/git/clone") {
        retrievePayload(jobId,function(err,res){
          if (err) {
            console.log(err);
          }
          else {
              var input = res;
              var payload = JSON.parse(input);
              var author = payload["author"];
              var repoUrl = payload["repoUrl"];
              var branch = payload["branch"];

              //creating input payload for stageSchedular
              retrieveResources(jobId,function(err,res){
                if (err) {
                  console.log(err);
                }
                else {
                  var workspace = res.WORKSPACE;
                  var stage_payload = {
                      jobId: jobId,
                      stageName: stageName,
                      cmd: comand,
                      input: {
                          REPO_URL: repoUrl,
                          BRANCH: branch,
                          WORKSPACE: workspace
                      }
                  };
                  stageScheduler.lpush(queueName, JSON.stringify(stage_payload), (err, reply) => {
                      if (err) {
                          console.log(err);
                      } else {
                          callback();
                      }
                  });
                }
              });
          }
        });
    }
    else {
      retrieveResources(jobId,function(err,res){
        if (err) {
          console.log(err);
        }
        else {
          console.log(res);
          var workspace = res.WORKSPACE;
          if (input_stages === null) {
            console.log('Code-review is Scheduled.');
            input_stages="https://github.com";
            }



          else{
            input_stages.WORKSPACE = workspace;

          }
          var stage_payload = {
              jobId: jobId,
              stageName: stageName,
              cmd: comand,
              input: input_stages
          }
            stageScheduler.lpush(queueName, JSON.stringify(stage_payload), (err, reply) => {
                if (err) {
                    console.log(err);
                } else {
                  console.log("pushed",queueName);
                    callback();
                }
            });

        }
      });
    }
}
//popping message from STAGE_SCHEDULAR queue
module.exports = function(reply, callback) {
    console.log('stage input',reply);
    jobId = JSON.parse(reply).jobId;
    stageName = JSON.parse(reply).stageName;
    console.log(stageName);
    updateStatus(jobId, stageName, callback);
};
