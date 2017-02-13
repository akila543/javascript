const redis = require('redis');
const should = require('should');
const async = require('async');
const retrieveStage = require('../Orchestrator/stateServices/stages/retrieveStage');
const retrievePayload = require('../Orchestrator/stateServices/payload/retrievePayload');
const resultsProcessor = require('../Orchestrator/resultsProcessor');
const updateStage = require('../Orchestrator/stateServices/stages/updateStage');
const updatePayload = require('../Orchestrator/stateServices/payload/updatePayload');
const client = redis.createClient();
describe('ResultProcessor',function(){
  var input={
    jobId:'CI-Pipeline_1',
    stageName:'build',
    stdout:'No build error',
    stderr:'',
    exitCode:0
  };

  var stageData= JSON.stringify({
                    type:"stackroute/javascript/build",
                    input:{"WORKSPACE":"{{context.workspace}}"},
                    output:null,
                    context:null,
                    depends_on:["gitClone"],
                    status:"Scheduled",
                    ts_scheduled:"2017-02-06T08:49:08.458Z"});


  var payload=JSON.stringify({repo:"node-uuid",
                          author:"broofa",
                          branch:"master",
                          headCommitId:"0983kshjhaqi1123344kmdjnsj",
                          commitIds:"839290njnwyqiqka19238jsjwj111",
                          gitClone:""});

  before(function(done){
    async.series([
        flushRedis.bind(null),
        updateStage.bind(null,input.jobId,input.stageName,stageData),
        updatePayload.bind(null,input.jobId,payload),
        resultsProcessor.bind(null,JSON.stringify(input))
      ],done);
  });

  it('Updating Stage in Redis',function(done){
    //TODO: retrieve Stage
    async.waterfall([
      retrieveStage.bind(null,'CI-Pipeline_1','build'),
      function(stage,callback){
        var my_stage=JSON.parse(stage);
        should.exist(my_stage);
        //TODO: my_stage should have property stdout and should not be empty
        my_stage.should.have.property('stdout').and.not.empty();
        //TODO: my_stage should have property stderr and should be empty
        my_stage.should.have.property('stderr').and.empty();
        //TODO: my_stage should have ts_completed and should not be null
        my_stage.should.have.property('ts_completed');
        should.exist('ts_completed');
        //TODO: my_stage should have property output and should not be empty
        my_stage.should.have.property('output').and.not.empty();
        //TODO: my_stage should have property exitCode and should be exactly 0
        my_stage.should.have.property('exitCode').and.be.exactly(0);
        //TODO: status should have property status,value 'Complete'
        my_stage.should.have.property('status').and.be.exactly('Complete');
        callback();
      }
    ],done);
  });

 it('Updating payload in Redis',function(done){
    //TODO: retrieve Payload
    async.waterfall([
      retrievePayload.bind(null,'CI-Pipeline_1'),
      function(payload,callback){
        var my_payload=JSON.parse(payload);
        //TODO: payload should have property 'stageName' ans should not be empty
        my_payload.should.have.property('build').and.not.empty();
        callback();
      }
    ],done);
  });

  it('Pushing Back To JOB_SCHEDULER',function(done){
    async.series([
        //TODO: Assert JOB_SCHEDULAR list length should be 1
        function(callback){
          client.llen('JOB_SCHEDULER',function(err,length){
            length.should.be.exactly(1);
          });
          callback();
        },
        //TODO: Assert list item should have property jobId and should be exactly
          function(callback){
          client.lrange('JOB_SCHEDULER',0,0,function(err,reply){
            var my_reply=JSON.parse(reply[0]);
            my_reply.should.have.property('jobId').and.be.exactly('CI-Pipeline_1');
          });
          callback();
        }
    ],done);
  });


  after(function(done){
    flushRedis(done);
  });

});

function flushRedis(done){
  client.flushdb(function(err,reply){
    if(err) console.log(err);
  });
  done();
}
