import React from 'react';
import {
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    CardTitle,
    CardText
} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


class Build extends React.Component {

  constructor(props) {
    super(props);
		this.state({data:this.props.res});
	}

  render() {
    if(data.status==='Complete')
    var avatar="../jsx/images/avatar1.jpeg";
  else
    var avatar="../jsx/images/avatar2.jpeg";
    return (
      <Card >
        <CardHeader
          title="Build"
          avatar={avatar}
          subtitle={data.status}
          actAsExpander={true}
          showExpandableButton={true}
        />
      <CardTitle title="Report" expandable={true} />
        <CardText expandable={true}>
        Status = {data.status}<br/>
			Output={data.stdout}<br /><br />
		Errors={data.stderr}<br />
	ExitCode={data.exitCode}<br/>
Initialized@= {data.initialized}<br />

        scheduled@= {data.scheduled}<br />
			completed@={data.completed}
        <br/>
        </CardText>
      </Card>
    );

}
}
export default Build;
