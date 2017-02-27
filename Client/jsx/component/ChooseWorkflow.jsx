var React = require('react');
var ReactDOM = require('react-dom');
import RaisedButton from 'material-ui/RaisedButton';
import Graph from './graph.jsx';
import Dialog from 'material-ui/Dialog';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/yaml';
import 'brace/theme/tomorrow';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import {Grid,Row,Col} from 'react-flexbox-grid/lib';
import request from 'superagent';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import cookie from 'react-cookie';
import HtmlHint from './HtmlHint.jsx';
import Build from './Build.jsx';
import Eslint from './Eslint.jsx';
import Mocha from './Mocha.jsx';
import CodeCoverage from './CodeCoverage.jsx';
import io from 'socket.io-client';
import {Link,hashHistory} from 'react-router';

import FinalResult from '../component/FinalResult.jsx'
import TitleCard from './TitleCard.jsx';
var YAML = require('json2yaml');


var doc;
var edge = new Array();
var node = new Array();
var x1 = 100,y1=100;
var next=null;

class ChooseWorkflow extends React.Component
{
	constructor(props)
	{
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleVisualise = this.handleVisualise.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleLogout=this.handleLogout.bind(this);
		console.log(this.props.params.user,this.props.params.repo);
		this.state={open:false,
                selectedRepo:"http://github.com/"+this.props.params.user+"/"+this.props.params.repo,
                graph:'',
                jsonCode:'',
                isSubmit:false,
                buttonState:true,
                templateContent: '',
                openTemplate: false,
                worklist:[],
                open1: false,
                isSelect:false,
                template: 'CI-Pipeline.yml',
								jobId:""
							}

	}
  // componentWillReceiveProps(nextProps)
  // {
  //   this.setState({selectedRepo:nextProps.params.githubUrl})
  // }

  componentWillMount(){
    var that = this;
    request
     .get('/workflows')
     .set({ 'API-Key': 'foobar', Accept: 'application/json' })
     .end(function(err,res){
       if (err) {
         console.log(err);
       }
       else {
				 console.log(res.text);
         that.setState({worklist:JSON.parse(res.text)});
       }
     });
    }

		handleLogout()
	    {
	        cookie.remove("access_token");
	        cookie.remove("type");
	    }

    handleClose()
  	{
  		this.setState({open:false});
  	}

    split()
  	{
  		var obj = doc.stages;
  		var jsonArray=[];
  		var incr =1;

  		var array = Object.getOwnPropertyNames(obj);
  		var json= {"nodes":[],"edges":[]};
  		var xaxis=[0,0,130,200,500,240,180,310,370,400,440,480,520,560,600] ;
  		var yaxis=[0,0,-50,0,100,-200,100,0,100,-200,-100,0,100,-150,200];
  		array.map(function(item){
  		x1=(xaxis[incr]*3);
  		y1=(yaxis[incr]*2);
  		var temp = {
  			id : incr,
  			title:item,
  			x:x1,
  			y:y1,
  			type:"empty"
  		}
  		incr++;
  		json.nodes.push(temp);
  		node.push(item);
  		var props = Object.getOwnPropertyNames(item);
  		edge.push(obj[item].depends_on);
  	});


  			for(var i in node)
  			{
  				if(edge[i]!=null)
  				{
  					if(edge[i].length<2)
  					{

  					//console.log(node[i] + " index "+(node.indexOf(node[i])+1) +" depends_on "+ (node.indexOf(edge[i].toString())+1));
  					var temp = {
  						target:node.indexOf(node[i])+1,
  						source:(node.indexOf(edge[i].toString())+1),
  						type:"emptyEdge"
  					}
  					json.edges.push(temp);
  					}
  					else
  					{
  						for(var k in edge[i])
  						{
  							//console.log("separate printing====>"+node.indexOf(edge[i][k]));
  							//console.log(node[i] +" index "+node.indexOf(node[i])+" depends_on "+ edge[i][k]+" index "+node.indexOf(edge[i][k]));
  							var temp = {
  						target:(node.indexOf(node[i])+1),
  						source:(node.indexOf(edge[i][k])+1),
  						type:"emptyEdge"
  								}
  								json.edges.push(temp);
  						}
  					}
  				}


  			}

  	var temp = <Graph data={json}/>
  	this.setState({graph:temp});
  	this.setState({open:true});

  	}

  	handleVisualise()
  	{
  		doc = (this.state.templateContent)
  		console.log(doc);
  		this.split();
  	}

    handleSubmit()
    {
      var that=this;
      request.post('/initiate').set('Accept','application/json').send({userName:cookie.load('user'),data:that.state.selectedRepo,templateName:that.state.template})
      .end(function(err, res){
           if (err || !res.ok) {
             alert('Oh no! error');
           } else {
             console.log("===============>jobId",res.text,"======>");//getting the jobId
						 that.setState({jobId:res.text});
        //      var userid=cookie.load('user');
        //      console.log("cookie",userid);
        //      var socket = that.state.socket;
        //      socket.emit('getjobstatus', {jobId:res.text,userId:userid});
        //           socket.on('report', function(data) {
        //               if (data.status === 'Monitoring Stopped') {
        //                   that.setState({stageArr: (
        //                           <h1>Monitoring Stopped</h1>
        //                       )});
        //               } else {
        //                   console.log(data.jobId, data.stageName, data.status);
        //                   switch (data.stageName) {
        //                       case 'build':
        //                           that.setState({stageArr1: (<Build res={data}/>)});
        //                           that.setState({stage1:data.status})
        //                           break;
        //                       case 'eslint':
        //                           that.setState({stageArr2: (<Eslint res={data}/>)});
        //                           that.setState({stage2:data.status})
        //                           break;
        //                       case 'htmlhint':
        //                           that.setState({stageArr3: (<HtmlHint res={data}/>)});
        //                           that.setState({stage3:data.status})
        //                           break;
        //                       case 'code-coverage':
        //                           that.setState({stageArr4: (<CodeCoverage res={data}/>)});
        //                           that.setState({stage4:data.status})
        //                           break;
        //                       case 'whitebox':
        //                           that.setState({stageArr5: (<Mocha res={data}/>)});
        //                           that.setState({stage5:data.status})
        //                           break;
        //                       default:
        //                           that.setState({stageArr6: (
        //                                   <div>
        //                                       <h4 style={{color:'#FFA500'}}>{data.jobId} Status:{data.status}</h4>
				 //
        //                                   </div>
				 //
        //                               )});
        //                               that.setState({stage6:data.status});
        //                               break;
        //                   }
        //               }
        //           });
         }
       });
    }

		render () {
      const actions = [
				<FlatButton
					label="Cancel"
					primary={true}
					onTouchTap={this.handleClose}
					/>,
				<FlatButton
					label="Submit"
					primary={true}
					keyboardFocused={true}
					onTouchTap={this.handleClose}
					/>,
			];
			var box = null;
      if(this.state.isSelect)
      {
        box=<div>
            <AceEditor
            mode="yaml"
            readOnly={true}
            theme="tomorrow"
            value={YAML.stringify(this.state.templateContent)}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{$blockScrolling: true}}
            style={{width:"500px"} ,{border:"1px solid black"}}
            />
            <Link to={"/finalresult/"+this.state.jobId}>
                <RaisedButton label="Submit" secondary={true} onClick={this.handleSubmit} style={{margin:"4%"}} />
            </Link>

            <FlatButton label="Visualise" primary={true} onClick={this.handleVisualise} style={{marginLeft:"4%"}} />
              <Dialog
  							title="Dialog With Actions"
  							actions={actions}
  							modal={false}
  							open={this.state.open}
  							onRequestClose={this.handleClose}>
  							{this.state.graph}
  						</Dialog>
          </div>

      }

      return (
				<div>
				<AppBar title={"Hello "+cookie.load("user")} iconElementRight={< Link to = "/" > <FlatButton label="Logout" labelStyle={{color:"white"}} onClick={this.handleLogout}/> < /Link>}/>
				<TitleCard/>
        <Grid>
          <Row style={{margin:"5px"}}>
            <Col lg={12}>
              <Card>
                <CardHeader title="Workflows" style={{backgroundColor:"#BDBDBD"}}></CardHeader>
              </Card>
            </Col>
          </Row>
          <Row style={{margin:'5px'}}>
            <Col lg={12}>
              <Card>
                  <CardHeader title="Choose WorkFlow" style={{backgroundColor:"#BDBDBD"}}/>
                      <CardText>
                        {this.state.worklist.map((item)=>(
                        <Menu>
                          <MenuItem key={item} primaryText={item.templateName} onClick={
                              ()=>{
                                this.setState({template:item.templateName,templateContent:item.content,open1:false,isSelect:true});
                              }}/>
                        </Menu>
                      ))}
                      </CardText>
              </Card>
            </Col>
          </Row>
          <Row style={{margin:"5px"}}>
            <Col lg={12}>
              {box}
            </Col>
          </Row>
        </Grid>
				</div>
      );
		} //end of render
	} //end of class TemplateEditor

	export default ChooseWorkflow;
