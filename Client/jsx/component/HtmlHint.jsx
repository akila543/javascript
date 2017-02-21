import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
<<<<<<< HEAD
const data1={
	"status": "Complete",
	"stdout": "No test folder found.\n",
	"stderr": "//stackroute/javascript/code-coverage: line 5: [: missing `]'\n",
	"exitCode": 0,
	"initialized@": "6:8:2",
	"scheduled@": "2017-02-16T06:08:50.838Z",
	"completed@": "2017-02-16T06:08:51.578Z"
};
=======
>>>>>>> 7e4bb5e05532817f9f467f1bd7208122e9864594

class HtmlHint extends React.Component {

  constructor(props) {
    super(props);
<<<<<<< HEAD
		this.state({data:this.props.res});
=======
		this.state = {data:this.props.res};
>>>>>>> 7e4bb5e05532817f9f467f1bd7208122e9864594
  }

	componentWillReceiveProps(nextProps){
		console.log(nextProps.res);
		this.setState({data:nextProps.res});
	}

  render() {
<<<<<<< HEAD
    if(data.status==='Complete')
=======
		console.log(this.state.data);
    if(this.state.data.status==='Complete')
>>>>>>> 7e4bb5e05532817f9f467f1bd7208122e9864594
    var avatar="../jsx/images/avatar1.jpeg";
  else
    var avatar="../jsx/images/avatar2.jpeg";
    return (
      <Card >
        <CardHeader
          title="HTMLHINT"
          avatar={avatar}
<<<<<<< HEAD
          subtitle={data.status}
=======
          subtitle={this.state.data.status}
>>>>>>> 7e4bb5e05532817f9f467f1bd7208122e9864594
          actAsExpander={true}
          showExpandableButton={true}
        />
      <CardTitle title="Report" expandable={true} />
        <CardText expandable={true}>
<<<<<<< HEAD
        Status = {data.status}<br/>
      Output={data.stdout}<br /><br />
        Errors={data.stderr}<br />
        ExitCode={data.exitCode}<br/>
        Initialized@= {data.initialized}<br />

        scheduled@= {data.scheduled}<br />
        completed@={data.completed}
=======
        Status = {this.state.data.status}<br/>
      Output={this.state.data.stdout}<br /><br />
        Errors={this.state.data.stderr}<br />
        ExitCode={this.state.data.exitCode}<br/>
        Initialized@= {this.state.data.initialized}<br />
        scheduled@= {this.state.data.scheduled}<br />
        completed@={this.state.data.completed}
>>>>>>> 7e4bb5e05532817f9f467f1bd7208122e9864594
        <br/>
        </CardText>
      </Card>
    );

  }
}

export default HtmlHint;
