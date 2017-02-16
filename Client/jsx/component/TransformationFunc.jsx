var React = require('react');
var ReactDOM = require('react-dom');
import AceEditor from 'react-ace';
var FlatButton = require('material-ui/FlatButton');
import RaisedButton from 'material-ui/RaisedButton';
import 'brace/mode/javascript';
import 'brace/theme/tomorrow';
import request from 'superagent';

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
		this.check = this.check.bind(this);
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

	handleSubmit()
	{
		if(this.state.isValid)
		{
			this.setState({
				isSubmit:true
			});
			request.post('/saveFile').send({ data:this.props.content,templateName:this.props.fileName, transfunction:this.state.code}).set('Accept', 'application/json')
			.end(function(err, res){
				if (err || !res.ok) {
					alert('Oh no! error');
				} else
				{
					console.log(res.text);
					alert("Successfully uploaded");
				 }
				});
		}

		else{
			alert("Transformation Function is still Invalid");
		}

	}


	check(e) {

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

		if(has_error){
			this.setState({
				isValid:false
			});
			alert("Its Invalid!!! Check the errors");
		}
		else{
			this.setState({
				isValid:true
			});
			alert('Valid js!!! ');

		}
	}

	render () {

		return (
			<div className="container">
				<AceEditor
					className="row"
					mode="javascript"
					theme="tomorrow"
					value={this.state.code}
					onChange={this.updateCode}
					name="ace"
					id="ace"
					editorProps={{$blockScrolling: true}}
					style={{width:"500px"} ,{border:"1px solid black"}}
					onLoad={(editor) => {
						editor.focus();
						editor.getSession();
					}}
					/>

				<div className="row">
					<RaisedButton
						label="Browse"
						labelPosition="before"
						style={styles.button}
						containerElement="label" primary={true}>
						<input type="file" id="jsfiledata" style={styles.exampleImageInput} onChange={this.handleChange}/>
					</RaisedButton>
					<RaisedButton label="Verify" secondary={true}  onClick={this.check} style={{marginLeft:"1%"}}/>
					<RaisedButton label="Submit" secondary={true} onClick={this.handleSubmit} style={{marginLeft:"1%"}} />
				</div>
			</div>

		);
	}
}

export default TransformationFunc;
