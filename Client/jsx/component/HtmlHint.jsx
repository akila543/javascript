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
          title="HTMLHINT"
          avatar={avatar}
          subtitle={this.state.data.status}
          actAsExpander={true}
          showExpandableButton={true}
        />
      <CardTitle title="Report" expandable={true} />
        <CardText expandable={true}>
        <h4>Status:</h4><div><pre>{this.state.data.status}</pre></div><br/>
        <h4>Errors:</h4><div><pre>{this.state.data.stderr}</pre></div><br />
        <h4>ExitCode:</h4><div><pre>{this.state.data.exitCode}</pre></div><br/>
        <h4>Initialized@:</h4><div><pre>{this.state.data.initialized}</pre></div><br />
        <h4>scheduled@:</h4><div><pre>{this.state.data.scheduled}</pre></div><br />
        <h4>completed@:</h4><div><pre>{this.state.data.completed}</pre></div><br/>
        <div>
        <h4>Output:</h4>
        {(typeof this.state.data.stdout === 'string')?
                    (
                        <div><pre>{this.state.data.stdout}</pre></div>
                    ):(
                    <div><pre>{JSON.stringify(this.state.data.stdout)}</pre></div>
                    )}
        </div>
        </CardText>
      </Card>
    );

  }
}

export default HtmlHint;
