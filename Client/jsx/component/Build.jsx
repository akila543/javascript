import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';

class Build extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.res
        };
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.res);
        this.setState({data: nextProps.res})
    }

    render() {
        console.log(this.state.data);
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
                <CardHeader title="Build" avatar={avatar} subtitle={this.state.data.status} actAsExpander={true} showExpandableButton={true}/>
                <CardText expandable={true}>
                <h4>ExitCode:</h4><div><pre>{this.state.data.exitCode}</pre></div><br/>
                <h4>Initialized@:</h4><div><pre>{this.state.data.initialized}</pre></div><br />
                <h4>Output:</h4><div><pre>{this.state.data.stderr}</pre></div><br />
                <h4>Errors:</h4><div><pre>{this.state.data.stderr}</pre></div><br />


                    <br/>
                </CardText>
            </Card>
        );

    }
}
export default Build;
