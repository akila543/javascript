//module imports
const deleteWorkflow = require('express').Router();
const MongoClient = require('mongodb').MongoClient;
//use a middleware
deleteWorkflow.use(require('body-parser').json());

// Connection URL
var url = 'mongodb://localhost:27017/workflows';

deleteWorkflow.post('/delete',function(req,res,next){
  console.log(req.body);
  next();
},function(req,res,next){
  //connect to mongodb
  MongoClient.connect(url,function(err,db){
    if(err){
      console.log('could not connect to mongodb');
    }
    else{
      console.log('connected');
      var template = db.collection('templates');
      var filt = new Object();
      filt[req.body.templateName] = req.body.content;
      template.deleteOne(filt,function(err,result){
        if (err) {
          console.log(err);
        }
        else {
          console.log(result.result.n);
          res.send('Successfully deleted.');
          db.close();
        }
      });
    }
  });
}
);

module.exports = deleteWorkflow;
















module.exports = deleteWorkflow;
