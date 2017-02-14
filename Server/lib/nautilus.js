const repl = require('repl');
const stream = require('stream');
const fs = require('fs');

module.exports = {
nautilus : function (payload,transfun){
//the output string
var FinalPayload = '';

//source buffer
var buf = Buffer.from(transfun);

//a write stream for output
class TransOutput extends stream.Writable{
  constructor(options){
    super(options);
  }
  write(chunk){
    var temp = chunk.toString().replace(/'\ '\ +$/,'');

    FinalPayload = temp;
    console.log(FinalPayload);
  }
}

//a write stream object
var writer = new TransOutput();

//readable stream
class TransInput extends stream.Readable {
  constructor(options){
    super(options);
  }
  read(){
      this.emit('data',buf);
      this.pause();
    }
}

//a read stream object
var reader = new TransInput();

//encoding for the readable data
reader.setEncoding('utf8');

//repl server instance
repl.start({
  prompt: '',
  input: reader,
  output: writer,
  ignoreUndefined: true
}).context.payload = payload;
return FinalPayload;
}
};
