//module imports
var ts = new Date();
const client = require('redis').createClient();
const fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/workflows';

var time,
    stages,
    stage,
    array = [];

//worker specific functions
function createPayload(jobId, payload, callback) {
    client.set(jobId + '_payload', JSON.stringify(payload), function(err, reply) {
        if (err)
            console.log(err);
        else {
            callback();
        }
    });
}

function createContext(jobId, callback) {
    var dir = '/tmp/' + jobId;
    client.hmset(jobId + '_resources', 'WORKSPACE', dir, function(err, reply) {
        if (err) {
            dir = '/tmp/';
            console.log(err);
        } else {
            dir = '/tmp/';
            callback();
        }
    });

}

function readTemplate(jobId, templateName, callback) {
    console.log("templateName===>", templateName);
    MongoClient.connect(url, function(err, db) {
        console.log("Connected correctly to server");
        var collection = db.collection('templates');
        // Find some documents
        collection.find({templateName: templateName}).toArray(function(err, docs) {
            if (!err) {
                console.log("Found the following records");
                console.log(docs);
                var template = docs[0].content;
                stages = template.stages;
                stage = Object.getOwnPropertyNames(template.stages);
                stage.map((item) => {
                    stages[item].status = 'Initialized';
                    stages[item].ts_Initialized = (new Date()).toISOString();

                })
                stages = JSON.stringify(stages);
                dataPush(jobId, callback);
            } else
                console.log(err);
            db.close();
            callback();
        });
    });
}

function pushIstages(jobId, callback) {
    client.hmset(jobId + '_stages', array, function(err, reply) {
        if (err)
            console.log(err);
        else {
            callback(jobId);
        }
    });
}

function dataPush(jobId, callback) {
    var tmp = JSON.parse(stages);
    stage.map((item) => {
        array.push(item);
        array.push(JSON.stringify(tmp[item]));
    });
    pushIstages(jobId, function(jobId) {
        client.lpush('JOB_SCHEDULER', jobId, function(err, reply) {
            if (!err) {
                console.log('data sent to JOB_SCHEDULER');
                client.lpush('JOBLIST', jobId, (err, reply) => {
                    if (!err) {
                        client.hmset(jobId, 'status', 'Initialized', 'at', (new Date()).toISOString(), function(err, reply) {
                            if(!err)
                                callback();
                            else{
                                console.log(err);
                            }
                            });

                    } else
                        console.log(err);
                    });

            } else
                console.log(err);
            });

    })

}

function Initiate(input, callback) {
    createPayload(input.jobId, input.payload, function() {
        createContext(input.jobId, function() {
            readTemplate(input.jobId, input.templateName, callback);
        });
    });
}

//module exports
module.exports = function(msg, callback) {
    console.log("it is called");
    Initiate(JSON.parse(msg), callback);
};
