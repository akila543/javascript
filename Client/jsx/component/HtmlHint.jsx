import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
const res={
	"status": "Complete",
	"stdout": "No test folder found.\n",
	"stderr": "//stackroute/javascript/code-coverage: line 5: [: missing `]'\n",
	"exitCode": 0,
	"initialized@": "6:8:2",
	"scheduled@": "2017-02-16T06:08:50.838Z",
	"completed@": "2017-02-16T06:08:51.578Z"
};

class CodeCoverage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    if(res.status==='Complete')
    var avatar="../jsx/images/avatar1.jpeg";
  else
    var avatar="../jsx/images/avatar2.jpeg";
    return (
      <Card >
        <CardHeader
          title="HTMLHINT"
          avatar={avatar}
          subtitle={res.status}
          actAsExpander={true}
          showExpandableButton={true}
        />
      <CardTitle title="Report" expandable={true} />
        <CardText expandable={true}>
        Status = {res.status}<br/>
      Output={res.stdout}<br /><br />
        Errors={res.stderr}<br />
        ExitCode={res.exitCode}<br/>
        Initialized@= {res.initialized}<br />

        scheduled@= {res.scheduled}<br />
        completed@={res.completed}
        <br/>
        </CardText>
      </Card>
    );

  }
}

export default CodeCoverage;
