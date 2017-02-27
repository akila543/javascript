const express = require('express');
var transfuns = express.Router();
var fs = require('fs');

//route specific middleware
transfuns.use(function(req,res,next){
  console.log(req.body)
  next();
});

//subroutes
transfuns.post('/transfun',function(req,res,next){
  next();
},function(req,res){
  fs.writeFile(__dirname+'/../db/transfun.txt',JSON.stringify(req.body),(err)=>{
    if(err){
      console.log(err);
    }
    else{
        res.end();
    }
  })
});

transfuns.post('/:transfunId',function(req,res,next){

  next();
},function(req,res){

});

module.exports = transfuns;
