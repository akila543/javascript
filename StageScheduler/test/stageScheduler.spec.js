const redis = require('redis');
const async = require('async');
const should = require('should');
var client=redis.createClient(6379, '127.0.0.1');
const retrieveStage = require('../Orchestrator/stateServices/stages/retrieveStage');
const updateStage = require('../Orchestrator/stateServices/stages/updateStage');
const updatePayload = require('../Orchestrator/stateServices/payload/updatePayload');
const updateResources = require('../Orchestrator/stateServices/resources/updateResources');

var stageScheduler=require('../Orchestrator/stageScheduler')

describe('StageScheduler', () => {
  var input = {
    jobId: 'CI-Pipeline_1',
    stageName: 'build'
  }
  var stages =JSON.stringify({
          type: "stackroute/javascript/build",
          input: {
              "WORKSPACE": "{{context.workspace}}"
          },
          output: null,
          context: null,
          depends_on: ["gitClone"],
          status: "Initialized"
      });
  var payload=JSON.stringify({
     repoUrl: "http://github.com/broofa/node-uuid",
      author: "broofa",
      branch: "master",
      headCommitId: "0983kshjhaqi1123344kmdjnsj",
      commitIds: "839290njnwyqiqka19238jsjwj111",
  });

  before(function(done) {
     async.series([
      updateStage.bind(null,input.jobId,input.stageName,stages),
       updatePayload.bind(null,input.jobId,payload),
       updateResources.bind(null,input.jobId,'/tmp/CI-Pipeline_1'),
       stageScheduler.bind(null,JSON.stringify(input)),
     ],done);
   });

  it('status of stage is changed from initialized to scheduled and ts_scheduled property added', function(done) {
    // TODO: Retrieve stage
      async.waterfall([
        retrieveStage.bind(null,input.jobId,input.stageName),
        (stage, callback) => {
          var stages=JSON.parse(stage);
          should.exist(stages);
          // TODO: stage should have property status and should be updated to scheduled
          stages.should.have.property('status').and.be.exactly('Scheduled');
          // TODO: stage should have property ts_scheduled
          stages.should.have.property('ts_scheduled');
          callback();
        }
      ], done);


  });

    it('Pushing Back to the languagePack', function(done) {
      // TODO: Retrieve message from jobScheduler
      async.series([
        function(callback){
          client.llen('stackroute/javascript',function(err,length){
            length.should.be.exactly(1);
          });
          callback();
        },
        function(callback){
          client.lrange('stackroute/javascript',0,-1,function(err,reply){
            // TODO: queue should have property jobId
            var my_reply=JSON.parse(reply[0]);
            my_reply.should.have.property('jobId');
              should.exist(my_reply.jobId);
            // TODO: queue should have property stageName
            my_reply.should.have.property('stageName');
              should.exist(my_reply.stageName);
                    // TODO: queue should have property cmd
            my_reply.should.have.property('cmd');
              should.exist(my_reply.cmd);
                      // TODO: queue should have property input
            my_reply.should.have.property('input');
            should.exist(my_reply.input);
          });
          callback();
        }
      ],done);
      });


  after(function(done) {
    flushRedis(done);
  });
});

function flushRedis(done) {
client.flushdb(function(err,reply){
  if(err)
  {
    console.log(err);
  }
});
done();
}
