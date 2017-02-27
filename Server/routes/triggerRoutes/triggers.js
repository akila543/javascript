const express = require('express');
var triggers = express.Router();

//trigger info
var triggerId;
var FinalPayload = new Object();
const triggerMap = {
  lg123: {
    templateName: 'template.json',
    transformationFun: function(payload){
      var temp = payload;
      return temp.head_commit.url;
    }
  }
};
//route specific middleware
triggers.use(function(req,res,next){
  console.log(req.body);
  next();
});

//subroutes
triggers.post('/:triggerId', function (req, res,next) {
  triggerId = req.params.triggerId;
  res.send('recieved');
  next();
},function(req,res,next){
  var triggers = Object.getOwnPropertyNames(triggerMap);
  triggers.forEach(trigger => {
    if(trigger === triggerId){
      var url = triggerMap[trigger].transformationFun(req.body);
      console.log(url,triggerMap[trigger].templateName);
      fs.readFile(__dirname+'/../db/template.json','utf8',(err,data)=>{
        if(err){
          console.log("Error");
        }
        else{
          console.log(data);
          var workflow = data;
          FinalPayload = {
            repo_url : url,
            template : workflow
          }
        }
      });
    }
  });
  next();
});

module.exports = triggers;
