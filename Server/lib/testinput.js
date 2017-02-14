const pi = require('./processInput');
const fs = require('fs');

//var pl = "this is the payload";
var tf = "function a(){return a();}";//'function(pl){var fp = {repo: pl.repository.full_name,author: pl.head_commit.author,branch: pl.ref,headCommitId: pl.head_commit.id,commitIds: (function() {var cids = new Array();pl.commits.map((elem) => {cids.push(elem.id);});return cids;})()};return fp;};';

fs.readFile(__dirname + '/../db/payload.json', (err, data) => {
    if (err) {
        console.log(err);
    } else {
      var pl = JSON.parse(data.toString());
      try{
        pi(tf,pl,function(a,result) {
          console.log(result);
        });
      }catch(e){
        if (e instanceof TypeError) {
          console.log("TypeError");
        } else if (e instanceof RangeError) {
          console.log("RangeError");
        } else if (e instanceof EvalError) {
          console.log("EvalError");
        } else {
           console.log("Error");
        }
      };
    }
});
