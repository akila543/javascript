const downloadReport = require('express').Router();
downloadReport.use(require('body-parser').json());

downloadReport.post('/user/:uid/downloadreport/:filename',function(req,res,next){
  console.log(req.params);
  next();
},function(req,res){
  var options = {
    root: __dirname + '/reports/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };
  res.sendFile(uid+'/'+filename,options);
});

module.exports = downloadReport;
