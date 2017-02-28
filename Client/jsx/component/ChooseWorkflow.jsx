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
import {GridList, GridTile} from 'material-ui/GridList';
import {List, ListItem} from 'material-ui/List';
import request from 'superagent';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import cookie from 'react-cookie';
import HtmlHint from './HtmlHint.jsx';
import Build from './Build.jsx';
import Eslint from './Eslint.jsx';
import Mocha from './Mocha.jsx';
import CodeCoverage from './CodeCoverage.jsx';
import io from 'socket.io-client';
import {Link,hashHistory} from 'react-router';
import TitleCardFlow from './TitleCardFlow.jsx';
import FinalResult from './FinalResult.jsx';
import DashNavbar from './DashNavbar.jsx';
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
		this.handleClose = this.handleClose.bind(this);
		this.handleLogout=this.handleLogout.bind(this);
    this.split = this.split.bind(this);
		//console.log(this.props.params.user,this.props.params.repo);
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
								jobId:"",
								bgcolor:"",
							}

	}

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
  		var obj = this.state.templateContent.stages;
      console.log(obj);
  		var jsonArray=[];
  		var incr =1;

  		var array = Object.getOwnPropertyNames(obj);
  		var json= {"nodes":[],"edges":[]};
			var yaxis=[0,0,130,240,500,130,130,240,350,400,440,480,520,560,600] ;
			var xaxis=[0,0,-10,-30,20,-150,100,30,0,-200,-100,0,100,-150,200];
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
    console.log("graph");
    console.log(this.state.graph);

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
        box=(<div>
            <div>{this.state.graph}</div>
            <Link to={"/finalresult/"+this.state.jobId}>
              <RaisedButton label="Submit" secondary={true} onClick={this.handleSubmit} style={{marginTop:"4%",marginLeft:"10%"}} />
            </Link>
					</div>);

      }
			else {

				box=(<div style={{height:"100%",opacity:"0.5"}}>
								<h1 style={{fontFamily:'Orbitron', color:"#19615d", textAlign:"center"}}>WORKFLOW</h1>
								<h3 style={{textAlign:"center", color:"#fe6342", fontFamily:'Orbitron' }}>
									Workflow is a Process or a Job divided into number of dependent or independent Stages.
								</h3>
						</div>);
			}

			var bar=null;
		    if(cookie.load('type')=='user')
		    bar=<AppBar title={"Hello "+cookie.load("user")} iconElementRight={< Link to = "/" > <FlatButton label="Logout" labelStyle={{color:"white"}} onClick={this.handleLogout}/> < /Link>}/>
				else if(cookie.load('type')=='admin'){
					bar=<DashNavbar/>
				}

      return (
				<div>
  				{bar}
  				<TitleCardFlow/>
					<GridList cols={2} cellHeight="auto">
						<GridTile style={{margin:'5px'}}>
								<Card>
										<CardHeader title="Choose WorkFlow" style={{backgroundColor:"#BDBDBD"}}/>
												<CardText>
													{this.state.worklist.map((item)=>(
													<Menu>
														<MenuItem key={item} primaryText={item.templateName} onClick={()=>{
																this.setState({template:item.templateName,templateContent:item.content,open1:false,isSelect:true},()=>{
																	this.split();
																});
															}}/>
													</Menu>
												))}
												</CardText>
								</Card>
						</GridTile>
						<GridTile style={{margin:"5px",opacity:"0.5"}}>
							{box}
						</GridTile>
					</GridList>
				</div>
      );
		} //end of render
	} //end of class TemplateEditor

	export default ChooseWorkflow;
