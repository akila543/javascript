//module imports
const redis = require('redis');

//input payload for stage processing
////input for eslint
var stage_payload1 = {
  jobId: 'jobId1',
  stageName: 'build',
  cmd: '/stackroute/javascript/build',
  input:{
    WORKSPACE: '/tmp/jobId1',
  }
};

var eslint_payload = {
  jobId: 'jobId5',
  stageName: 'eslint',
  cmd: '/stackroute/javascript/eslint',
  input:{
    WORKSPACE: 'tmp/jobId5',
    INCLUDE: '**/*.js',
    EXCLUDE: 'node_modules',
  },
};

////input for htmlhint
var htmlhint_payload = {
  jobId: 'jobId1',
  stageName: 'htmlhint',
  cmd: 'stackroute/javascript/htmlhint',
  input:{
    workspace: 'tmp/jobId1',
    include: '**/*.html',
    exclude: '**/*.jsx',
  },
};

////input for mocha
var mocha_payload = {
  jobId: 'jobId3',
  stageName: 'unittest',
  cmd: 'stackroute/javascript/mocha',
  input:{
    WORKSPACE: 'tmp/jobId3',
    INCLUDE: ' ',
    EXCLUDE: ' ',
  },
};

////input for codeCoverage
var instanbul_payload = {
  jobId: 'jobId1',
  stageName: 'codeCoverage',
  cmd: 'stackroute/javascript/instanbul',
  input:{
    WORKSPACE: 'tmp/jobId1',
    INCLUDE: ' ',
    EXCLUDE: ' ',
  },
};


//adding stage payload to the worker queue
var client = redis.createClient(6379,'127.0.0.1');
