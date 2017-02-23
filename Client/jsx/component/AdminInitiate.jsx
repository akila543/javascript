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
import io from 'socket.io-client';
import HtmlHint from './HtmlHint.jsx';
import Build from './Build.jsx';
import Eslint from './Eslint.jsx';
import Mocha from './Mocha.jsx';
import CodeCoverage from './CodeCoverage.jsx';

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

class AdminInitiate extends React.Component{
  constructor(props){
    super(props);
    this.state = {input:'',completed:0, isSubmit:false,output:null,socket: io.connect('http://localhost:3000/monitor'),stageArr1:'',stageArr2:'',stageArr3:'',stageArr4:'',stageArr5:'',stageArr6:'',stage1:'',stage2:'',stage3:'',stage4:'',stage5:'',stage6:''};
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
    cookie.remove("type");

  }

  handleSubmit(e){
    console.log(this.state.input );
    var that = this;
    that.setState({isSubmit:true});

    Request.post('/initiate').send({ data: this.state.input,templateName:"CI-Pipeline.yml"}).set('Accept', 'application/json')
           .end(function(err, res){
             if (err || !res.ok) {
               alert('Oh no! error');
             } else {
                    console.log(res.text);//getting the jobId
                    var userid=cookie.load('user');
                    console.log("cookie",userid);
                    var socket = that.state.socket;
                    socket.emit('getjobstatus', {jobId:res.text,userId:userid});
                    socket.on('report', function(data) {
                        if (data.status === 'Monitoring Stopped') {
                            that.setState({stageArr: (
                                    <h1>Monitoring Stopped</h1>
                                )});
                        } else {
                            console.log(data.jobId, data.stageName, data.status);
                            switch (data.stageName) {
                                case 'build':
                                    that.setState({stageArr1: (<Build res={data}/>)});
                                    that.setState({stage1:data.status})
                                    break;
                                case 'eslint':
                                    that.setState({stageArr2: (<Eslint res={data}/>)});
                                    that.setState({stage2:data.status})
                                    break;
                                case 'htmlhint':
                                    that.setState({stageArr3: (<HtmlHint res={data}/>)});
                                    that.setState({stage3:data.status})
                                    break;
                                case 'code-coverage':
                                    that.setState({stageArr4: (<CodeCoverage res={data}/>)});
                                    that.setState({stage4:data.status})
                                    break;
                                case 'whitebox':
                                    that.setState({stageArr5: (<Mocha res={data}/>)});
                                    that.setState({stage5:data.status})
                                    break;
                                default:
                                    that.setState({stageArr6: (
                                            <div>
                                                <h2 style={{color:'#FFA500'}}>{data.jobId} Status:{data.status}</h2>

                                            </div>

                                        )});
                                        that.setState({stage6:data.status});
                                        break;
                            }
                        }
                    });
           }
         });
       }

  render(){
    var box=null;
    console.log(this.state.stage1);
      if(this.state.isSubmit){
      box=<div >
        {this.state.stageArr6}
        {this.state.stageArr1}
        {this.state.stageArr2}
        {this.state.stageArr3}
        {this.state.stageArr4}
        {this.state.stageArr5}
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

export default AdminInitiate;
