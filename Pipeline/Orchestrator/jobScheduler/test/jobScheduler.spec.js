const async = require('async');
const should = require('should');
const client = require('redis').createClient();
const jobScheduler = require('../Orchestrator/JobScheduler');
const retrieveAllStages = require('../Orchestrator/stateServices/stages/retrieveAllStages');
const CI_temp = require('./CI_temp')

describe('jobScheduler', () => {
var input = {
  jobId:'CI-Pipeline_1',
};
  //templateName: 'jobScheduler.test.yml'
  before(function(done){

   async.series([
      flushRedis.bind(null),
          CI_temp.bind(null),
        jobScheduler.bind(null,input.jobId),
    ],done);
  });

  it('Stages are created', function(done) {
    // TODO: Retrieve Stages
    async.waterfall([
    retrieveAllStages.bind(null,input.jobId),
    (stages,callback) => {

      // TODO: Stages has properties gitclone, build, whitebox
      console.log(stages);
      stages.should.have.property('gitClone');
      stages.should.have.property('build');
      stages.should.have.property('whitebox');
      // TODO: Each stage should have property status, value 'Initialized'
      JSON.parse(stages.gitClone).should.have.property('status').and.be.exactly('Initialized');
      JSON.parse(stages.build).should.have.property('status').and.be.exactly('Initialized');
      JSON.parse(stages.whitebox).should.have.property('status').and.be.exactly('Initialized');
            callback();
    }
    ],done);

  });

  it('job is pushed to STAGE_SCHEDULER',function(done){
      //TODO: Assert STAGE_SCHEDULER list length should be 1
      async.series([
        function(callback){
          client.llen('STAGE_SCHEDULER',function(err,length){
            length.should.be.exactly(1);
          });
          callback();
        },
        function(callback){
          // TODO: Retrieve STAGE_SCHEDULER list
        client.lrange('STAGE_SCHEDULER',0,-1,function(err,result){
          console.log('lrange result====>',result);
          // TODO: Assert list item should have property 'jobId' and 'stageName'
          result.should.have.property('jobId').and.be.exactly('abc');
          result.should.have.property('stageName');
        });
        callback();
        }
      ],done);
    });

  after(function(callback) {
   flushRedis(callback);
  });
});

function flushRedis(flushcallback) {
  client.flushdb();
  flushcallback();//(err,reply) =>{if(err) console.log(err); flushcallback();});
}
