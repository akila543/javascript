import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class CodeCoverage extends React.Component {

  constructor(props) {
    super(props);
		this.state = {data:this.props.res};
	}

	componentWillReceiveProps(nextProps){
		console.log(nextProps.res);
		this.setState({data:nextProps.res})
	}

  render() {
		console.log(this.state.data);
    var output='';
    var error='';
    if(this.state.data.stdout!=undefined){
    var out=this.state.data.stdout.split("=");
    var err=this.state.data.stderr.split('=');
    output=out[62];
    error=err;
  }
  if (this.state.data.status === 'Complete')
      var avatar = "../jsx/images/avatar1.jpeg";
  else   if (this.state.data.status === 'Failed')
      var avatar = "../jsx/images/avatar2.jpeg";
  else if(this.state.data.status==='Blocked')
      var avatar="../jsx/images/block.png";
  else {
    var avatar="../jsx/images/pending.png";
  }
    return (
      <Card >
        <CardHeader
          title="CodeCoverage"
          avatar={avatar}
          subtitle={this.state.data.status}
          actAsExpander={true}
          showExpandableButton={true}
        />
      <CardTitle title="Report" expandable={true} />
        <CardText expandable={true}>
        <h4>Status:</h4><div><pre>{this.state.data.status}</pre></div><br/>
        <h4>Output:</h4><div><pre>{output}</pre></div><br />
        <h4>Errors:</h4><div><pre>{error}</pre></div><br />
        <h4>ExitCode:</h4><div><pre>{this.state.data.exitCode}</pre></div><br/>
        <h4>Initialized@:</h4><div><pre>{this.state.data.initialized}</pre></div><br />
        <h4>scheduled@:</h4><div><pre>{this.state.data.scheduled}</pre></div><br />
        <h4>completed@:</h4><div><pre>{this.state.data.completed}</pre></div><br/>
        <br/>
        </CardText>
      </Card>
    );

  }
}

export default CodeCoverage;
