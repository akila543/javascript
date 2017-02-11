const async = require('async');
const should = require('should');
const client = require('redis').createClient();
const stateInitializer = require('../Orchestrator/stateInitializer');
const retrieveResources = require('../Orchestrator/stateServices/resources/retrieveResources');
const retrievePayload = require('../Orchestrator/stateServices/payload/retrievePayload');
const retrieveAllStages = require('../Orchestrator/stateServices/stages/retrieveAllStages');
//const retrieveStage = require('./Orchestrator/stateServices/stages/retrieveStage');

describe('StateInitializer', () => {
  var input = {
    payload: {
      foo: 'bar',
      repoUrl: 'https://github.com/stackroute/distributed-pipeline'
    },
    templateName: 'stateInitializer.test.yml'
  }

  before(function(done) {
    async.series([
      flushRedis.bind(null),
      stateInitializer.bind(null,JSON.stringify(input)),
    ],done);
  });

  it('Resources is created', function(done) {
    // TODO: Retrieve Resources
    async.waterfall([
      retrieveResources.bind(null, 'stateInitializer.test.yml_1'),
      (resources, callback) => {
        console.log(resources);
        should.exist(resources);
        // TODO: WORKSPACE is present
        should.exist(resources.WORKSPACE)
        //should.exist(resources.WORKSPAC);
        resources.should.have.property('WORKSPACE');

        callback();
      }
    ], done);
  });

  it('Payload is created', function(done) {
    // TODO: Retrieve Payload
    async.waterfall([
      retrievePayload.bind(null, 'stateInitializer.test.yml_1'),
      (payload, callback) => {
        should.exist(payload);
        // TODO: payload should have property foo and should be exactly bar
        JSON.parse(payload).should.have.property('foo').and.be.exactly('bar');
        // TODO: payload should have property repoUrl and should be exactly ''
        JSON.parse(payload).should.have.property('repoUrl').and.be.exactly('https://github.com/stackroute/distributed-pipeline');
        callback();
      }
    ], done);
  });

  it('Stages is created', function(done) {
    // TODO: Retrieve Stages
    async.waterfall([
    retrieveAllStages.bind(null,'stateInitializer.test.yml_1'),
    (stages,callback) => {
      // TODO: Stages has properties gitclone, build, whitebox
      stages.should.have.property('gitClone');
      stages.should.have.property('build');
      stages.should.have.property('whitebox');
      // TODO: Each stage should have property status, value 'Initialized'
      JSON.parse(stages.gitClone).should.have.property('status').and.be.exactly('Initialized');
      JSON.parse(stages.build).should.have.property('status').and.be.exactly('Initialized');
      JSON.parse(stages.whitebox).should.have.property('status').and.be.exactly('Initialized');
      // TODO: Each stage should have property ts_initialized
      JSON.parse(stages.gitClone).should.have.property('ts_Initialized');
      should.exist(JSON.parse(stages.gitClone).ts_Initialized)
      JSON.parse(stages.build).should.have.property('ts_Initialized');
      should.exist(JSON.parse(stages.build).ts_Initialized)
      JSON.parse(stages.whitebox).should.have.property('ts_Initialized');
      should.exist(JSON.parse(stages.whitebox).ts_Initialized)
      callback();
    }
    ],done);

  });

  it('job is pushed to jobScheduler', function(done) {
    // TODO: Retrieve jobScheduler list
    async.waterfall([
      (callback)=>{client.lrange('JOB_SCHEDULER',0,-1,function(err,reply){
        reply.length.should.be.exactly(1);
        reply.toString().should.be.exactly('stateInitializer.test.yml_1');
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

  client.flushdb((err,reply) =>{
    if(err)
      console.log(err);
    done();
  });

}
