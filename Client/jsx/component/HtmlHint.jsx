import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


class HtmlHint extends React.Component {

  constructor(props) {
    super(props);
		this.state = {data:this.props.res};
  }

	componentWillReceiveProps(nextProps){
		console.log(nextProps.res);
		this.setState({data:nextProps.res});
	}

  render() {
		console.log(this.state.data);
    if(this.state.data.status==='Complete')
    var avatar="../jsx/images/avatar1.jpeg";
  else
    var avatar="../jsx/images/avatar2.jpeg";
    return (
      <Card >
        <CardHeader
          title="HTMLHINT"
          avatar={avatar}
          subtitle={this.state.data.status}
          actAsExpander={true}
          showExpandableButton={true}
        />
      <CardTitle title="Report" expandable={true} />
        <CardText expandable={true}>
        Status = {this.state.data.status}<br/>
      Output={this.state.data.stdout}<br /><br />
        Errors={this.state.data.stderr}<br />
        ExitCode={this.state.data.exitCode}<br/>
        Initialized@= {this.state.data.initialized}<br />
        scheduled@= {this.state.data.scheduled}<br />
        completed@={this.state.data.completed}
        <br/>
        </CardText>
      </Card>
    );

  }
}

export default HtmlHint;
