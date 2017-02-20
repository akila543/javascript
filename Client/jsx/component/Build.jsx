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
        this.res = this.props.res;
    }

    render() {
        if (this.res.status === 'Complete')
            var avatar = "../jsx/images/avatar1.jpeg";
        else
            var avatar = "../jsx/images/avatar2.jpeg";
        return (
            <Card >
                <CardHeader title="Build" avatar={avatar} subtitle={this.res.status} actAsExpander={true} showExpandableButton={true}/>
                <CardTitle title="Report" expandable={true}/>
                <CardText expandable={true}>
                    Status = {this.res.status}<br/>
                    Output={this.res.stdout}<br/><br/>
                    Errors={this.res.stderr}<br/>
                    ExitCode={this.res.exitCode}<br/>
                    Initialized@= {this.res.initialized}<br/>

                    scheduled@= {this.res.scheduled}<br/>
                    completed@={this.res.completed}
                    <br/>
                </CardText>
            </Card>
        );

    }
}

export default Build;
