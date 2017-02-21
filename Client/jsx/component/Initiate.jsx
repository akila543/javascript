import React from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Results from './Results.jsx';
import Request from 'superagent';
import {Link} from 'react-router';
import CircularProgress from 'material-ui/CircularProgress';
import AppBar from 'material-ui/AppBar';
import cookie from 'react-cookie';
import FlatButton from 'material-ui/FlatButton';
const styles = {
  button: {
    margin: 12,
    align:"center"
  },
  paper:{
 textAlign: 'center',
 display: 'inline-block',
  },
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 1,
  },
  inputField:{
    align:"center"
  },
  progress:{
    marginTop:'50px',
    marginLeft:'50px'
  }
};

class Initiate extends React.Component{
  constructor(props){
    super(props);
    this.state = {input:'',completed:0, isSubmit:false,output:null};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleChange(e){
    e.preventDefault();
    this.setState({input:e.target.value});
  }

  handleLogout()
  {
    cookie.remove("access_token");

  }

  handleSubmit(e){
    console.log(this.state.input );
    var that = this;
    this.setState({isSubmit:true});

    Request.post('/initiate').send({ data: this.state.input,templateName:"CI-Pipeline.yml"}).set('Accept', 'application/json')
           .end(function(err, res){
             if (err || !res.ok) {
               alert('Oh no! error');
             } else {
               if(res.text !== 'jobFailed')
                    {
                    that.setState({output:JSON.parse(res.text)});
                    }
                  else
                    {
                    console.log(res.text);//getting the jobId
                  }
             }
           });
  }

  render(){
    var box=null;
    if(this.state.isSubmit && this.state.output==null){
      box=<div >
      <Link to="/monitori">
              <FlatButton label='Click to monitor' hoverColor='#e8f1fb ' labelStyle={{
                  textAlign: 'left'
              }} style={{
                  fontSize: '50px',
                  marginTop: '4px'
              }}/>
      </Link>
            <CircularProgress size={80} thickness={5} style={styles.progress} />
            </div>
    }
    else if(this.state.isSubmit){
      box=<div>
          <Results output={this.state.output}/>

      </div>
    }

    return (<div>
      <TextField
        id="repoUrl" value={this.state.input} onChange={this.handleChange}
        floatingLabelText="Repo URL"
        type="text"
       style={styles.inputField}
      />
      <RaisedButton
       target="_blank"
       label="Submit"
       secondary={true}
       onClick={this.handleSubmit}
       style={styles.button}
     />
      {box}

    </div>);
  }

}

export default Initiate;
