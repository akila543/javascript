var client = require('redis').createClient();
var jobInput = {
    payload:{
            repoUrl:'http://github.com/broofa/node-uuid',
            author:'broofa',
            branch:'master',
            headCommitId:'0983kshjhaqi1123344kmdjnsj',
            commitIds:'839290njnwyqiqka19238jsjwj111'

    },
    templateName:"CI-Pipeline"
                }

    client.lpush('QM',JSON.stringify(jobInput),(err,reply)=>{
var async = require('async');
// var jobInput = {
//     payload:{
//             repoUrl:'http://github.com/broofa/node-uuid',
//             author:'broofa',
//             branch:'master',
//             headCommitId:'0983kshjhaqi1123344kmdjnsj',
//             commitIds:'839290njnwyqiqka19238jsjwj111'

//     },
//     templateName:"CI-Pipeline"
// }




module.exports = function (input,callback)
{
    console.log('Initiate pipeline called');
    client.lpush('QM',JSON.stringify(input),(err,reply)=>{

>>>>>>> 06d35325ca9b54dffe8a0584c03c4f385a226cc6
        console.log(reply);

        result(function(resultArray){
            callback(null,resultArray);
        });

    });
}

function result(callback)
{
    console.log('result called');
    client.brpop('COMPLETE_RESULT',0,1,function(err,reply){
        if(!err)
        {
            console.log("=========="+reply);
            if(reply!=null)
            {
            if(JSON.parse(reply[1]).status==1)
            {
                client.hgetall(JSON.parse(reply[1]).jobId+'_stages',function(err,reply){
                    var resultArray = [];
                    var temp;
                    var cntr = 0;
                    // console.log(Object.getOwnPropertyNames(reply));
                    Object.getOwnPropertyNames(reply).map((item)=>{
                        var result = {};
                            result[item] = JSON.parse(reply[item]).output;
                            resultArray.push(result);

                    });
                    callback(resultArray);

                })
            }
            else
            {
                callback("jobFailed");
            }
        }
        else
            result(callback);
        }
        else
            console.log(err);
    })
}
