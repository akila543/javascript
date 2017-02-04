const async = require('async');
const should = require('should');
const retrieveResources = require('../Orchestrator/stateServices/resources/retrieveResources');
const retrievePayload = require('../Orchestrator/stateServices/payload/retrievePayload');
const retrieveAllStages = require('../Orchestrator/stateServices/stages/retrieveAllStages');

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
      stateInitializer.bind(null, )
    ],done);
  });

  it('Resources is created', function(done) {
    // TODO: Retrieve Resources
    async.waterfall([
      retrieveResources.bind(null, 'abc'),
      (resources, callback) => {
        should.exist(resources);
        // TODO: WORKSPACE is present
        resources.should.have.property('WORKSPACE');
        should.exist(resources.WORKSPACE);
        callback();
      }
    ], done);
  });

  it('Payload is created', function(done) {
    // TODO: Retrieve Payload
    async.waterfall([
      retrievePayload.bind(null, 'abc'),
      (payload, callback) => {
        should.exist(payload);
        // TODO: payload should have property foo and should be exactly bar
        payload.should.have.property('foo').and.be.exactly('bar');
        // TODO: payload should have property repoUrl and should be exactly ''
        payload.should.have.property('repoUrl').and.be.exactly('');
        callback();
      }
    ], done);
  });

  it('Stages is created', function(done) {
    // TODO: Retrieve Stages
    // TODO: Stages has properties gitclone, build, whitebox
    // TODO: Each stage should have the data present in template
    // TODO: Each stage should have property status, value 'Initialized'
    // TODO: Each stage should have property ts_initialized
  });

  it('job is pushed to jobScheduler', function(done) {
    // TODO: Retrieve jobScheduler list
    // TODO: Assert list length should be exactly 1
    // TODO: Assert list item should have property 'jobId'
  });

  after(function(done) {
    flushRedis(done);
  });
});

function flushRedis(done) {

}