var React = require('react');
var ReactDOM = require('react-dom');
var yamlLint = require('yaml-lint');
var yaml = require('js-yaml');
import RaisedButton from 'material-ui/RaisedButton';
import {GridList, GridTile} from 'material-ui/GridList';
import Graph from './graph.jsx';
import Dialog from 'material-ui/Dialog';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/yaml';
import 'brace/theme/tomorrow';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import TransfuncEdit from './TransfuncEdit.jsx';
var YAML = require('json2yaml');

var doc;
var edge = new Array();
var node = new Array();
var x1 = 100,y1=100;

class WorkFlowEdit extends React.Component
{
	constructor(props)
	{
		super(props);
		this.updateCode = this.updateCode.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.split=this.split.bind(this);
		this.state={open:false,graph:'',jsonCode:'',templateName:this.props.filename,code:this.props.data ,err:[],isValid:false, isSubmit:false}

	}

  componentWillReceiveProps(newProps)
  {
   this.setState({code:YAML.stringify(newProps.data),templateName:newProps.filename});
  }


	handleClose()
	{
		this.setState({open:false});
	}


	split()
	{	console.log("splt");
		var obj = yaml.safeLoad(this.state.code).stages;

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

		updateCode(newcode)
		{
			if(newcode)
			{
				this.setState({code:newcode});
			}
			if(true)
			{
				this.checkDependency();
			}
		}

		checkDependency()
		{	var errors=[];
			var errLines=[];
			var workflow=yaml.safeLoad(this.state.code);
			var stagesObj=workflow.stages; //its a Json
			var stages=Object.keys(stagesObj); //list of all stages
			stages.forEach(function(item){
				var depends_on=stagesObj[item].depends_on;
				if(depends_on != null)
				{
					depends_on.map(function(e){
						if(stages.indexOf(e) == -1){
							errors.push(e);
						}
					}); //end of map
				}
			});
			console.log("Errors:"+ errors);
			/*-------------getting lineNumber for each error and dispalying in editor---------------------------*/
			var annot=[];
			if(errors.length != 0)
			{
				var mycode=this.state.code;
				errors.map(function(item){
					var index=mycode.indexOf(item);
					var tempString = mycode.substring(0, index);
					var lineNumber = tempString.split('\n').length;
					errLines.push(lineNumber);
					annot.push({ row: lineNumber-1, column: 2, type: 'error', text:'some error.'});

				}); //end of map
			} //end of if
			this.setState({err:annot});
		}//end of checkDependency

		handleSubmit()
		{
				var that = this;
				this.handleVerify(function(){
					if(that.state.isValid)
					{
						that.setState({isSubmit:true});
						that.setState({err:[]});
						alert("Great!!! Workflow Submitted.");
					}
					else{
						console.log('dependency errors');
					}
				});
		}

		handleVerify(callback)
		{
			if(this.state.err.length === 0)
			{
				var that = this;
				yamlLint.lint(that.state.code).then(function () {
					console.log(that.state.err.length);
					that.setState({
						isValid: true,
					});
					callback();
				}).catch(function (error) {
					alert("You still have linting errors");
					var errtext=error.message;
					var startindex=error.message.indexOf("at line") + 8;
					var endindex=error.message.indexOf("column")-2;

					var errrow=error.message.substring(startindex,endindex)-1;
					var myerror=[{ row: errrow, column: 2, type: 'error', text:errtext }];
					that.setState({isValid:false});
					that.setState({err:myerror})
					console.log(error.message);
					callback();
				});
			}
			else
			{	this.setState({isValid:false});
				alert('OOPS!!!! you have ERRORS');
				callback();
			}
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

			var box=null;

			if(this.state.isSubmit)
			{
				box= <TransfuncEdit fileName={this.props.filename} content={this.state.code} transfunction={this.props.transfunction}/>;
			}
			else
			{
				box= <GridList cols={2} cellHeight='auto' style={{width:"95%"}}>
							<GridTile>
								<div>
									<AceEditor
										value={this.state.code}
										mode="yaml"
										theme="tomorrow"
										onChange={this.updateCode}
										name="ace_editor"
										id="ace_editor"
										annotations={this.state.err}
										editorProps={{$blockScrolling: true}}
										style={{border:"1px solid black",margin:"5%",width:"90%", height:"400px"}}
										onLoad={(editor) => {
											editor.focus();
											editor.getSession();
										}}
										/>
								</div>
								<div style={{textAlign:"left"}}>
									<RaisedButton label="Submit" secondary={true} onClick={this.handleSubmit} style={{margin:"1%"}} />
									<FlatButton label="Visualise" primary={true} onClick={this.split} style={{margin:"1%"}} />
								</div>

							</GridTile>
							<GridTile style={{height:"550px",marginTop:"3%"}}>
								<div>
									{this.state.graph}
								</div>
							</GridTile>

						 </GridList>
			}


			return (
				<div>
					{box}
				</div>

			);
		} //end of render
	} //end of class TemplateEditor

	export default WorkFlowEdit;
