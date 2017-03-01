const downloadReport = require('express').Router();
downloadReport.use(require('body-parser').json());
const path = require('path');

downloadReport.get('/download/:jobId',function(req,res,next){
  console.log(req.params);
  next();
},function(req,res){
  var options = {
    root: path.join(__dirname,'../../reports/'),
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };
  res.sendFile(req.params.jobId+".json",options);
});

module.exports = downloadReport;
