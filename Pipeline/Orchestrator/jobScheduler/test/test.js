const async = require('async');
const stateInitializer = require('./test/stateInitializer.spec');
const JobScheduler = require('./test/JobScheduler.spec');
const stageScheduler = require('./test/stageScheduler.spec');
const resultsProcessor = require('./test/resultsProcessor.spec');
const cloneAgent = require('./test/agentTestst/cloneAgenttest');

async.series([
  
],function(err,results){
  if (err) {
    console.log(err);
  } else {
    console.log('Test results '+results);
  }
});
