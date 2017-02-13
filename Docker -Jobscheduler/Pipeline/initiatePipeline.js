var client = require('redis').createClient(6379, '172.23.238.179');
var jobInput = {
    payload: {
        repoUrl: 'http://github.com/broofa/node-uuid',
        author: 'broofa',
        branch: 'master',
        headCommitId: '0983kshjhaqi1123344kmdjnsj',
        commitIds: '839290njnwyqiqka19238jsjwj111'

    },
    templateName: "CI-Pipeline"
}

client.lpush('QM', JSON.stringify(jobInput), (err, reply) => {
    console.log(reply);
});
