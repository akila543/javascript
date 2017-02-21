var React = require('react');
var ReactDOM = require('react-dom');
import AceEditor from 'react-ace';
var FlatButton = require('material-ui/FlatButton');
import RaisedButton from 'material-ui/RaisedButton';
import 'brace/mode/javascript';
import 'brace/theme/tomorrow';
import request from 'superagent';
var YAML=require('yamljs');
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
		console.log("should be json");
		console.log(YAML.parse(this.props.content));
		this.updateCode = this.updateCode.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state={code:this.props.transfunction,isValid:false, isSubmit:false};

	}

	updateCode(newcode)
	{
		this.setState({code:newcode});
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
			this.setState({
				isValid:false
			});
			alert("Its Invalid!!! Check the errors");
		}
		else
		{
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 7e4bb5e05532817f9f467f1bd7208122e9864594
			this.setState({
				isValid:true
			});
			if(this.state.isValid)
			{
				this.setState({
					isSubmit:true
				});
	      request.post('/workflows/update')
					.set('Content-Type', 'application/json')
					.send({templateName:this.props.fileName,content:YAML.parse(this.props.content),transfunction:this.state.code})
					.end(function(err,res){
						if (err) {
							console.log(err);
						}
						else {
							console.log(res);
	            alert('Valid js!!! Successfully Updated ');
<<<<<<< HEAD
							hashHistory.push('/dashboard');

=======
>>>>>>> 7e4bb5e05532817f9f467f1bd7208122e9864594
						}
					});
			}
		}
<<<<<<< HEAD
=======
			request.post('/workflows/update')
			.set('Content-Type', 'application/json')
			.send({templateName:this.props.fileName,content:YAML.parse(this.props.content),transfunction:this.state.code})
			.end(function(err,res){
				if (err) {
					console.log(err);
				}
				else {
					console.log(res);
	        alert('Valid js!!! Successfully Updated ');
				}
  		});

		} //end of else
>>>>>>> 4f0027c26128b00c22f0e2dd321f33782b3f47dd
=======
>>>>>>> 7e4bb5e05532817f9f467f1bd7208122e9864594
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
  					style={{width:"60%",border:"1px solid black",margin:"10px"}}
  					onLoad={(editor) => {
  						editor.focus();
  						editor.getSession();
  					}}
  					/>
        </div>

				<div className="row" style={{textAlign:"left"}}>
					<RaisedButton label="Submit" secondary={true} onClick={this.handleSubmit} style={{margin:"1%"}} />
				</div>
			</div>

		);
	}
}

export default TransformationFunc;
