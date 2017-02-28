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
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import TransformationFunc from './TransformationFunc.jsx';

var doc;
var edge = new Array();
var node = new Array();
var x1 = -100,y1=-100;
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

class AddTemplateEdit extends React.Component
{
		constructor(props)
		{
			super(props);

			this.updateCode = this.updateCode.bind(this);
			this.handleSubmit = this.handleSubmit.bind(this);
			this.updateFilename=this.updateFilename.bind(this);
			this.handleClose = this.handleClose.bind(this);
			this.showFileName=this.showFileName.bind(this);
			this.handleVerify = this.handleVerify.bind(this);
			this.state={open:false,graph:'',jsonCode:'',filename:'',code:"write your workflow here",err:[],isValid:false, isSubmit:false}

		}



		handleClose()
		{
			this.setState({open:false});
		}



		split()
		{	console.log("split");
			var obj = yaml.safeLoad(this.state.code).stages;
			//console.log(obj);
			var jsonArray=[];
			var incr =1;

			var array = Object.getOwnPropertyNames(obj);
			var json= {"nodes":[],"edges":[]};
			var yaxis=[0,0,130,240,500,130,130,240,350,400,440,480,520,560,600] ;
			var xaxis=[0,0,-10,-30,20,-150,100,30,0,-200,-100,0,100,-150,200];
			//var a=1;
			array.map(function(item){
				x1=(xaxis[incr]*4);
				y1=(yaxis[incr]*2-100);
				console.log(item,x1,y1);
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

  	} //end of split

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
        var reader = new FileReader();
  			reader.onload = function(event) {
						if(true){
							that.setState({code:event.target.result});
							that.split();
						}
  			};
  			reader.readAsText(temp);

      }


    }

		updateFilename(e)
		{
			this.setState({filename:e.target.value});
		}

		updateCode(newcode)
		{
				this.setState({code:newcode});
				this.checkDependency();
		}

		checkDependency()
		{
			var errors=[];
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
				console.log('errrrrrrrrr');
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
			var myerr=[{ row: 1, column: 2, type: 'error', text: 'Some error.'}];

			var box=null;
			var val= this.state.code;

			if(this.state.isSubmit)
			{
				console.log(this.state.filename);
				box= <TransformationFunc fileName={this.state.filename} content={this.state.code}/>;
			}
			else
			{

				box= <GridList cellHeight="auto" cols={2} style={{width:"95%"}}>
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
										style={{border:"1px solid black",margin:"5%",width:"90%",height:"400px"}}
										onLoad={(editor) => {
											editor.focus();
											editor.getSession();
										}}
										/>
								</div>
								<div style={{marginLeft:"1%"}}>
									<TextField
							      hintText="Enter File Name"
							      floatingLabelText="File Name"
							      floatingLabelFixed={true}
										value={this.state.filename}
										onChange={this.updateFilename}
							    />
									<RaisedButton
										label="Browse Template"
										labelPosition="before"
										style={styles.button}
										containerElement="label" primary={true}>
										<input type="file" id="myFile" style={styles.exampleImageInput} onChange={this.showFileName}/>
									</RaisedButton>
								</div>

								<div style={{textAlign:"left"}}>
									<RaisedButton label="Submit" secondary={true} onClick={this.handleSubmit} style={{margin:"1%"}} />
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

	export default AddTemplateEdit;
