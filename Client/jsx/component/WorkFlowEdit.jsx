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


class WorkFlowEdit extends React.Component
{
	constructor(props)
	{
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.handleVerify = this.handleVerify.bind(this);
		this.updateCode = this.updateCode.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state={open:false,graph:'',jsonCode:'',code:"//write your yml code here",err:[],isValid:false, isSubmit:false}

	}

	handleChange()  //for upload button
	{
		var that = this;
		var temp = document.getElementById('filedata').files[0];
		var ext = temp.name.split('.').pop().toLowerCase();
		if(ext!="yml")
		{
			alert('Not a yml file');
		}
		else{
			var reader = new FileReader();
			reader.onload = function(e) {

				that.setState({
					code:reader.result });
				}
				reader.readAsText(temp);
			}

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
				box=<div>
					<AceEditor
						mode="yaml"
						theme="tomorrow"
						value={this.state.code}
						onChange={this.updateCode}
						name="UNIQUE_ID_OF_DIV"
						annotations={this.state.err}
						editorProps={{$blockScrolling: true}}
						
						/>
					<div className="row">
						<div className="upload ">
							<input type="file" name="upload" onChange={this.handleChange} id='filedata' />
						</div>
						<RaisedButton label="Verify" secondary={true}  onClick={this.handleVerify} style={{marginLeft:"1%"}}/>
						<RaisedButton label="Submit" secondary={true} onClick={this.handleSubmit} style={{marginLeft:"1%"}} />

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
