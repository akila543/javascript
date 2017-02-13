//module imports
const async = require('async');
const redis = require('redis');
const should = require('should');
const spawn = require('child_process').spawn;
const cloneAgent = require('../../LanguagePacks/cloneAgent');

//redis client
var client = redis.createClient(6379,'127.0.0.1');

describe('cloneAgent',function(){
  var stage_payload = {
    jobId: 'CI-Pipeline_1',
    stageName: 'gitClone',
    cmd: 'stackroute/git/clone',
    input:{
      REPO_URL: 'https://github.com/rsunray/ciserver',
      BRANCH: 'refs/heads/master',
      WORKSPACE: '/tmp/CI-Pipeline_1',
    }
  };

  var result;

      before(function(done){
        this.timeout(7500);
        async.waterfall([
          (callback)=>{
            client.flushdb();
            callback();
          },
          cloneAgent.bind(null,JSON.stringify(stage_payload)),
        ],done);
      });

      it('Cloned repo should exist',function(done){
        async.series([
          (callback)=>{
            var res = spawn('ls',['-A',stage_payload.input.WORKSPACE]);
            res.on('close',(code)=>{
              //code=1,if folder is empty
              //code=2,if folder doesn't exist
              code.should.be.exactly(0);
            });
            callback();
          },
        ],done);
      });

      it('Exit code in the result should be 0',function(done){
        async.waterfall([
          (callback)=>{
            client.brpop('results',0,callback);
          },
          (reply,callback)=>{
            result = JSON.parse(reply[1]);
            result.exitCode.should.be.exactly(0);
            callback();
          }
        ],done);
      });

      it('Stage status should be in progress',function(done){
        async.series([
          (callback)=>{
            result.stageStatus.should.be.exactly('IN PROGRESS');
            callback();
          }
        ],done);
      });

      after(function(done){
        async.series([
          (callback)=>{
            client.flushdb();
            callback();
          }
        ],done)
      });
});
