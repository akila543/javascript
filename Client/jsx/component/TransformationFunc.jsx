var React = require('react');
var ReactDOM = require('react-dom');
import AceEditor from 'react-ace';
var FlatButton = require('material-ui/FlatButton');
import RaisedButton from 'material-ui/RaisedButton';
import 'brace/mode/javascript';
import 'brace/theme/tomorrow';
import request from 'superagent';
import {hashHistory} from 'react-router';


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

class TransformationFunc extends React.Component
{
	constructor(props)
	{
		super(props);

		this.updateCode = this.updateCode.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state={code:"//write js transformation function here",isValid:false, isSubmit:false};

	}

	updateCode(newcode)
	{
		this.setState({code:newcode});
	}

	handleChange()
	{
		var that = this;
		var temp = document.getElementById('jsfiledata').files[0];
		var ext = temp.name.split('.').pop().toLowerCase();
		if(ext!="js")
		{
			alert('Not a js file');
		}
		else{

			var reader = new FileReader();
			reader.onload = function(e) {
				console.log(reader.result);
				that.setState({
					code:reader.result });
				}
				reader.readAsText(temp);
			}

	}


	handleSubmit(e) {

		e.preventDefault();
		var editwrap = document.getElementById("ace");
		var annotation_lists=editwrap.env.document.$annotations;
		var has_error = false;

		// Unfortunately, you get back a list of lists. However, the first list is
		//   always length one (but not always index 0
		for (var l in annotation_lists) {
			var annotation = annotation_lists[l];
			console.log(annotation.type);
			if (annotation.type === "error") {
				has_error = true;
			}
		}

		if(has_error)
		{
			alert("Its Invalid!!! Check the errors");
		}
		else
		{
			request.post('/saveFile').send({ data:this.props.content,templateName:this.props.fileName, transfunction:this.state.code}).set('Accept', 'application/json')
			.end(function(err, res){
				if (err || !res.ok) {
			 		alert('Oh no! error');
				} else
				{
					console.log(res.text);
					alert("Valid js!!! Successfully uploaded");
				 }
				});
<<<<<<< HEAD

				request.post('/saveFile').send({ data:this.props.content,templateName:this.props.fileName, transfunction:this.state.code}).set('Accept', 'application/json')
				.end(function(err, res){
					if (err || !res.ok) {
						alert('Oh no! error');
					} else
					{
						console.log(res.text);
						alert("Valid js!!! Successfully uploaded");
						hashHistory.push('/dashboard');
						}
					});
			}

=======
>>>>>>> 4f0027c26128b00c22f0e2dd321f33782b3f47dd
		}
	}

	render () {

		return (
			<div className="container" style={{width:"auto"}}>
				<div className="row">
					<AceEditor
						mode="javascript"
						theme="tomorrow"
						value={this.state.code}
						onChange={this.updateCode}
						name="ace"
						id="ace"
						editorProps={{$blockScrolling: true}}
						style={{border:"1px solid black",margin:"1%",width:"60%"}}
						onLoad={(editor) => {
							editor.focus();
							editor.getSession();
						}}
						/>
				</div>

				<div className="row" style={{textAlign:"left"}}>
					<RaisedButton
						label="Browse"
						labelPosition="before"
						style={styles.button}
						containerElement="label" primary={true}>
						<input type="file" id="jsfiledata" style={styles.exampleImageInput} onChange={this.handleChange}/>
					</RaisedButton>
					<RaisedButton label="Submit" secondary={true} onClick={this.handleSubmit} style={{marginLeft:"1%"}} />
				</div>
			</div>

		);
	}
}

export default TransformationFunc;
