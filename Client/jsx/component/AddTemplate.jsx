  var React = require('react');
  var ReactDOM = require('react-dom');
  import AceEditor from 'react-ace';
  var FlatButton = require('material-ui/FlatButton');
  import RaisedButton from 'material-ui/RaisedButton';
  import TextField from 'material-ui/TextField';
 import Request from 'superagent';


  const styles = {
     button: {
       margin: 20,
     },
     exampleImageInput: {
       cursor: 'pointer',
       position: 'absolute',
       top: 0,
       bottom: 0,
       right: 20,
       left: 0,
       width: '100%',
       opacity: 0,
     },
  };
  class AddTemplate extends React.Component
  {

    constructor(props){
      super(props);
      this.state = {filename:'',fileSelected:false, savPath:'./file.txt'};
      this.showFileName = this.showFileName.bind(this);
      this.uploadFile=this.uploadFile.bind(this);
    }

    showFileName() {
      var temp = document.getElementById('myFile').files[0];
      var ext = temp.name.split('.').pop().toLowerCase();
      if(ext!="yml")
      {
        alert('Not a yml file');
      }
      else {
        var fil = document.getElementById("myFile");
        this.setState({filename:fil.value});
        this.setState({fileSelected:true});

      }
    }
    uploadFile()
  {
      var that = this;
      var temp = document.getElementById('myFile').files[0];
      var ext = temp.name.split('.').pop().toLowerCase();
      if(ext!="yml")
      {
        alert('Not a yml file');
      }
      else{
        var reader = new FileReader();
        reader.onload = function(e) {
          that.setState({
            code:reader.result
          });

  Request.post('/saveFile').send({ data: reader.result,fileName:temp.name}).set('Accept', 'application/json')
        .end(function(err, res){
          if (err || !res.ok) {
            alert('Oh no! error');
          } else
          {
            console.log(res.text);
           }
             });
           }
         reader.readAsText(temp);
       }
     }



    render () {
      return (
                <div>
              <TextField
              hintText="Filename"
              floatingLabelText="File Name" disabled={true} value={this.state.filename}
              />
              <RaisedButton
                label="Choose Template"
                labelPosition="before"
                style={styles.button}
                containerElement="label" primary={true}>
                  <input type="file" id="myFile" style={styles.exampleImageInput} onChange={this.showFileName}/>
          </RaisedButton>
              <RaisedButton label="Upload" secondary={true} onClick={this.uploadFile} />
            </div>
        );
      }
  }
  export default AddTemplate;
