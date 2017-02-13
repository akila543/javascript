import React from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Results from './Results.jsx';
import Request from 'superagent';
import CircularProgress from 'material-ui/CircularProgress';

const styles = {
  button: {
    margin: 12,
    align:"center"
  },
  paper:{
    height: 800,
 width: 1000,
 margin: 100,
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
    marginLeft:'400px',
    width:'400px'
  },
  progress:{
    marginTop:'50px',
    marginLeft:'500px'
  }
};

class Home extends React.Component{
  constructor(props){
    super(props);
    this.state = {input:'',completed:0, isSubmit:false,output:null};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    e.preventDefault();
    this.setState({input:e.target.value});
  }

  handleSubmit(e){
    console.log(this.state.input );
    var that = this;
    this.setState({isSubmit:true});

    Request.post('/results').send({ data: this.state.input }).set('Accept', 'application/json')
           .end(function(err, res){
             if (err || !res.ok) {
               alert('Oh no! error');
             } else {
               if(typeof res.text != String)
                    {
                    that.setState({output:JSON.parse(res.text)});
                    }
                  else
                    {console.log(res.text);
                    alert("Server error");
                  }
             }
           });
  }

  render(){
    var box=null;
    if(this.state.isSubmit && this.state.output==null){
      box=<div >
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

export default Home;
