//module imports
var ts = new Date();
var client = require('redis').createClient(6379,'127.0.0.1');
var time,stages,dir='/tmp/',stage,array=[];

//worker specific functions
function createPayload(jobId,msg,callback)
{
	client.set(jobId+'_payload',JSON.stringify(msg),function(err,reply){
			if(err)
				console.log(err);
			else
			{
				callback();
			}
	});
}

function createContext(jobId,callback)
{
	dir += jobId;
	client.set(jobId+'_resources',dir,function(err,reply){
		if(err)
			console.log(err);
		else
		{
			dir = '/tmp/';
			callback();
		}
	});

}

function readTemplate(jobId,msg,callback)
{
 			    stage = Object.getOwnPropertyNames(msg.stages);
 				stage.map((item)=>{
 				   //time = ts.getHours() + ":" + ts.getMinutes() + ":" + ts.getSeconds();
					 if(item === "gitClone")
					 {
						 msg.stages[item].status ='Initialized';
					 }
					 else {
					 		msg.stages[item].status ='Initialized';
					 }
 				});
 				dataPush(jobId);
				callback();
}


function pushIstages(jobId,callback)
{
	console.log("setting on"+jobId);
	client.hmset(jobId+'_stages',array,function(err,reply){
		if(err)
			console.log(err);
		else
		{
			client.set(jobId,jobId+'_stages',function(err,reply){
				if(err)
					console.log(err);
				else
				{
					callback(jobId);
				}
			})
		}
	});
}

function dataPush(jobId)
{
	stage.map((item)=>{
		array.push(item);
		array.push(JSON.stringify(stages[item]));
	});
	pushIstages(jobId,function(jobId){
		client.lpush('JOB_SCHEDULER',jobId,function(err,reply){
			if(!err)
				console.log('data sent to JOB_SCHEDULER');
			else
				console.log(err);
		});
	})


}


function Initiate (msg,callback)
{
	var input = JSON.parse(msg);
	stages=input.template.stages;
	client.get('counter',function(err,reply){
		if(!err)
		{

		 var jobId = input.template.templateName+'_'+(++reply);
			client.set('counter',reply,function(err,reply){
				if(!err)
				{
					console.log(jobId);
					createPayload(jobId,input.payload,function(){
					createContext(jobId,function(){
					readTemplate(jobId,input.template,callback);
						})
					})
				}
				else
					console.log(err);
			})

		}
		else
			console.log(err);
	})

}

//module exports
module.exports = function(msg,callback){
	Initiate(msg,callback);
};
