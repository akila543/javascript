import React from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Results from './Results.jsx';
import Request from 'superagent';
import CircularProgress from 'material-ui/CircularProgress';

const styles = {
  circularprog:{
    margin: 12,
    position: 'relative',
    top: 100,
    bottom: 0,
    right: 0,
    left: 570,
  },
  textfield:{
    position: 'absolute',
    top: 50,
    bottom: 0,
    right: 0,
    left: 500,
  },
  button: {
    margin: 12,
    position: 'relative',
    top: 60,
    bottom: 0,
    right: 0,
    left: 570,
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
};

class Home extends React.Component{
  constructor(props){
    super(props);
    this.state = {input:'',completed:0, isSubmit:false,output:null,dataSource:[],};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdateInput = this.handleUpdateInput(this);
  }

  handleUpdateInput(value){
    this.setState({
      dataSource: [
        value,
        value + value,
        value + value + value,
      ],
    });
  };

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
               console.log(typeof res.text);
               if(res.text !== 'jobFailed')
                    {
                    that.setState({output:JSON.parse(res.text)});
                    }
                  else
                    {console.log(res.text);
                    alert("Server error: "+res.text);
                  }
             }
           });
  }

  render(){
    var box=null;
    if(this.state.isSubmit && this.state.output==null){
      box=<div>
            <CircularProgress size={100} thickness={9} style={styles.circularprog}/>
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
        style={styles.textfield}
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
