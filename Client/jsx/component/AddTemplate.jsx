var React = require('react');
  var ReactDOM = require('react-dom');
  import AceEditor from 'react-ace';
  var FlatButton = require('material-ui/FlatButton');
  import RaisedButton from 'material-ui/RaisedButton';
  import TextField from 'material-ui/TextField';
 import Request from 'superagent';
 //import AddTemplateEditor from './AddTemplateEditor.jsx';
 import AddTemplateEdit from './AddTemplateEdit.jsx';


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
      this.state = {filename:'',fileSelected:false, savPath:'./file.txt', isValid:false, code:'fdvasfdtxy'};
      this.showFileName = this.showFileName.bind(this);
    }

    showFileName(e) {
      var temp = e.target.files[0];
      var ext = temp.name.split('.').pop().toLowerCase();
      if(ext!="yml")
      {
        alert('Not a yml file');
      }
      else {
        var fil = document.getElementById("myFile");
        var that = this;
        this.setState({filename:fil.value});
        this.setState({isValid:true});
        var reader = new FileReader();
  			reader.onload = function(event) {
            that.setState({code:event.target.result});
  			};
  			reader.readAsText(temp);

      }
    }
  /*  uploadFile()
  {
        Request.post('/saveFile').send({ data:this.state.code,fileName:temp.name}).set('Accept', 'application/json')
        .end(function(err, res){
          if (err || !res.ok) {
            alert('Oh no! error');
          } else
          {
            console.log(res.text);
           }
          });
          alert('file uploaded');

  }*/

    render () {
      var box=null;
      if(this.state.isValid)
      {
        box=<div>
          <AddTemplateEdit data={this.state.code} filename={this.state.filename}/>
        </div>
      }
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
              {box}
            </div>
        );
      }
  }
  export default AddTemplate;
