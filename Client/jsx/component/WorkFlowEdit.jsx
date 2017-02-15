var React = require('react');
var ReactDOM = require('react-dom');
var yamlLint = require('yaml-lint');
var yaml = require('js-yaml');
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/yaml';
import 'brace/theme/tomorrow';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import request from 'superagent';


class WorkFlowEdit extends React.Component
{
	constructor(props)
	{
		super(props);
		this.handleVerify = this.handleVerify.bind(this);
		this.updateCode = this.updateCode.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state={templateName:this.props.templateName,code:this.props.data,err:[],isValid:false, isSubmit:false}

	}

		componentWillReceiveProps(newProps)
		{
	   this.setState({code:newProps.data})
		}

		handleVerify()
		{
			this.setState({buttonState:false});
			var that = this;
			yamlLint.lint(this.state.code).then(function () {
				that.setState({
					isValid: true
				});
				that.setState({err:[]	})
				alert('Valid File');
			}).catch(function (error) {
				var errtext=error.message;
				var startindex=error.message.indexOf("at line") + 8;
				var endindex=error.message.indexOf("column")-2;

				var errrow=error.message.substring(startindex,endindex)-1;
				var myerror=[{ row: errrow, column: 2, type: 'error', text:errtext }];
				that.setState({isValid:false});
				that.setState({err:myerror})
				alert('Invalid file!!! correct the error.');
				console.log(error.message);
			});

		}

		updateCode(newCode)
		{
			this.setState({code:newCode});
		}

		handleSubmit()
		{	if(this.state.isValid)
			{	alert('YAML file submitted');
				this.setState({
					isSubmit:true
				});
				request.post('/update')
				.set('Content-Type', 'application/json')
				.send({templateName:this.state.templateName,content:this.state.code})
				.end(function(err,res){
					if (err) {
						console.log(err);
					}
					else {
						console.log(res);
					}
				});
			}

			else{
				alert("Yaml is Still InValid");
			}

		}


		render () {


			var box=null;

			if(this.state.isSubmit)
			{
				box= <TransformationFunc/>;
			}
			else
			{
				box= <div>
					<AceEditor
						mode="yaml"
						theme="tomorrow"
						value={this.state.code}
						onChange={this.updateCode}
						name="UNIQUE_ID_OF_DIV"
						annotations={this.state.err}
						editorProps={{$blockScrolling: true}}
						style={{width:"10%"},{height:"70%"} ,{border:"1px solid black"}}
						/>
					<div>
						<RaisedButton label="Verify" secondary={true}  onClick={this.handleVerify} style={{margin:"1%"}} />
						<RaisedButton label="Submit" secondary={true} onClick={this.handleSubmit} />

					</div>

				</div>
			}


			return (
				<div>
					{box}
				</div>

			);
		} //end of render
	} //end of class TemplateEditor

	export default WorkFlowEdit;
