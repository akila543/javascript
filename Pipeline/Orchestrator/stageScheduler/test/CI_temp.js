var path = require('path');
var updateStage = require(path.join(__dirname,'../Orchestrator/stateServices/stages/updateStage'));
var client = require('redis').createClient(6379, '127.0.0.1');
var stages = {
    build: JSON.stringify({
        type: "stackroute/javascript/build",
        input: {
            "WORKSPACE": "{{context.workspace}}"
        },
        output: null,
        context: null,
        depends_on: ["gitClone"],
        status: "Initialized"
    }),
    gitClone: JSON.stringify({
        type: "stackroute/git/clone",
        input: {
            "REPOSITORY_URL": "{{payload.repo_url}}",
            "BRANCH": "{{payload.repo_ref}}",
            "WORKSPACE": "{{context.workspace}}"
        },
        output: null,
        context: null,
        depends_on: null,
        status: "Initialized",
    }),
    whitebox: JSON.stringify({
        type: "stackroute/javascript/mocha",
        input: {
            "INCLUDE": "{{payload.whitebox.include}}",
            "EXCLUDE": "{{payload.whitebox.exclude}}"
        },
        output: {
            payload: {
                output: {
                    unittest: "{{OUTPUT}}"
                }
            }
        },
        context: null,
        depends_on: ["build"],
        status: "Initialized",
    })
};
module.exports = function(callback){
    var stageNames = Object.getOwnPropertyNames(stages);
    stageNames.map((stage,i)=>{
        updateStage('CI-Pipeline_1',stage,stages[stage],function(){});
        if(stageNames.length-1 === i){
            callback();
        }
    });
   // client.hmset('testCI','stages',JSON.stringify(stages),callback);
}