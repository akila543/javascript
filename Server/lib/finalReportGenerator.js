const async = require('async');
const fs = require('fs');
//const rediscli = require('redis').createClient();
const MongoClient = require('mongodb').MongoClient;

//db connection url
var url = 'mongodb://localhost:27017/reports';

module.exports = function(jobId,result,done){
  async.parallel([
    function(callback){
      MongoClient.connect(url, function(err, db) {
          if (err) {
              console.log('---- DB connection error <<=== ' + err + ' ===>>');
          } else {
              db.collection('buildreports').updateOne({
                  jobId: jobId
              }, {
                  $set: {
                      report: result,
                  }
              }, function(err, result) {
                if (err) {
                    console.log('---- DB add error <<=== ' + err + ' ===>>');
                } else {
                    console.log("+-+- Report add status(+1-0) <<=== " + result.result.n + " ===>>");
                    db.close();
                    callback();
                }
            });// end of report
        }
    }); // end of MongoClient
    },
    function(callback){
      fs.writeFile("./reports/"+jobId+".json",JSON.stringify(result), 'utf8', function(err) {
          if (err) {
              return console.log(err);
          } else {
              console.log('report backedup.');
          }
      });
    }
  ],done);
}
