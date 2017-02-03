//module imports
const rW = require('./workerServices/registerWorker');
const stateInitializer = require('./Orchestrator/stateInitializer');
const JobScheduler = require('./Orchestrator/JobScheduler');
const stageScheduler = require('./Orchestrator/stageScheduler');
const resultsProcessor = require('./Orchestrator/resultsProcessor');
const cloneAgent = require('./LanguagePacks/cloneAgent');
const jsAgent = require('./LanguagePacks/JavaScript/jsAgent');

//register a worker for a qeueue
rW('QM',stateInitializer);
rW('JOB_SCHEDULER',JobScheduler);
rW('STAGE_SCHEDULER',stageScheduler);
rW('stackroute/git',cloneAgent);
rW('stackroute/javascript',jsAgent);
rW('results',resultsProcessor);
