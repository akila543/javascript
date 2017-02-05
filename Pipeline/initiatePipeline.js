var client = require('redis').createClient(6379,'127.0.0.1');
var jobInput = {
    payload:{
            repo:'node-uuid',
            author:'broofa',
            branch:'master',
            headCommitId:'0983kshjhaqi1123344kmdjnsj',
            commitIds:'839290njnwyqiqka19238jsjwj111'

    },
    templateName:"CI-Pipeline"
                }

    client.lpush('QM',JSON.stringify(jobInput),(err,reply)=>{
        console.log(reply);
    });
