var client = require('redis').createClient();

module.exports = function (input,userName,callback)
{
    console.log('Pipeline initiated...',input.payload.repoUrl);

    client.get('counter', function(err, reply) {
        if (!err) {
            var jobId = input.templateName + '_' + (++reply);
            client.set('counter', reply, function(err, reply) {
                if (!err) {
                    console.log(jobId);
                    input.jobId = jobId;
                    client.lpush('QM',JSON.stringify(input),(err,reply)=>{
                      if (err) {
                        console.log(err);
                      }
                      else{
                            callback(null,jobId);
                      }
                    });
                } else
                {
                    console.log(err);
                }
            })
        } else
            console.log(err);
    })
}

// function result(cb)
// {
//     client.brpop('COMPLETE_RESULT',0,function(err,reply){
//         if(!err)
//         {
//             console.log("Pipeline Result====>"+reply);
//             if(reply!=null)
//             {
//             if(JSON.parse(reply[1]).status==1)
//             {
//                 client.hgetall(JSON.parse(reply[1]).jobId+'_stages',function(err,reply){
//                     var resultArray = [];
//                     var temp;
//                     var cntr = 0;
//                     // console.log(Object.getOwnPropertyNames(reply));
//                     Object.getOwnPropertyNames(reply).map((item)=>{
//                       if(item !== 'gitClone' && item !== 'execute' && item !== 'code-review' )
//                       {
//                         var result = {};
//                             result[item] = JSON.parse(reply[item]).output;
//                             resultArray.push(result);
//                       }
//                     });
//                     cb(resultArray);
//                 })
//             }
//             else
//             {
//                 cb("jobFailed");
//             }
//         }
//         else
//             result(cb);
//         }
//         else
//             console.log(err);
//     })
// }
