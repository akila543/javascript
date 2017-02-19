import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
const res={
	"status": "Complete",
	"stdout": "uuid@3.0.0 /tmp/CI-Pipeline.yml_6\n`-- mocha@3.1.2 \n  +-- browser-stdout@1.3.0 \n  +-- commander@2.9.0 \n  | `-- graceful-readlink@1.0.1 \n  +-- debug@2.2.0 \n  | `-- ms@0.7.1 \n  +-- diff@1.4.0 \n  +-- escape-string-regexp@1.0.5 \n  +-- glob@7.0.5 \n  | +-- fs.realpath@1.0.0 \n  | +-- inflight@1.0.6 \n  | | `-- wrappy@1.0.2 \n  | +-- inherits@2.0.3 \n  | +-- minimatch@3.0.3 \n  | | `-- brace-expansion@1.1.6 \n  | |   +-- balanced-match@0.4.2 \n  | |   `-- concat-map@0.0.1 \n  | +-- once@1.4.0 \n  | `-- path-is-absolute@1.0.1 \n  +-- growl@1.9.2 \n  +-- json3@3.3.2 \n  +-- lodash.create@3.1.1 \n  | +-- lodash._baseassign@3.2.0 \n  | | +-- lodash._basecopy@3.0.1 \n  | | `-- lodash.keys@3.1.2 \n  | |   +-- lodash._getnative@3.9.1 \n  | |   +-- lodash.isarguments@3.1.0 \n  | |   `-- lodash.isarray@3.0.4 \n  | +-- lodash._basecreate@3.0.3 \n  | `-- lodash._isiterateecall@3.0.9 \n  +-- mkdirp@0.5.1 \n  | `-- minimist@0.0.8 \n  `-- supports-color@3.1.2 \n    `-- has-flag@1.0.0 \n\n",
	"stderr": " npm is using /usr/bin/nodejs but there is no node binary in the current PATH. Use the `--scripts-prepend-node-path` option to include the path for the node binary npm was executed with.\n",
	"exitCode": 0,
	"initialized": "6:8:2",
	"scheduled": "2017-02-16T06:08:44.649Z",
	"completed": "2017-02-16T06:08:50.831Z"
};

class Build extends React.Component {

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
          title="Build"
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

export default Build;
