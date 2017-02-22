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
var count = 0;

class Mocha extends React.Component {

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
        else
            var avatar = "../jsx/images/avatar2.jpeg";
        return (
            <Card >
                <CardHeader title="Mocha" avatar={avatar} subtitle={this.state.data.status} actAsExpander={true} showExpandableButton={true}/>
                <CardTitle title="Report" expandable={true}/>
                <CardText expandable={true}>
                <h4>Status:</h4><div><pre>{this.state.data.status}</pre></div><br/>
                <h4>Errors:</h4><div><pre>{this.state.data.stderr}</pre></div><br />
                <h4>ExitCode:</h4><div><pre>{this.state.data.exitCode}</pre></div><br/>
                <h4>Initialized@:</h4><div><pre>{this.state.data.initialized}</pre></div><br />
                <h4>scheduled@:</h4><div><pre>{this.state.data.scheduled}</pre></div><br />
                <h4>completed@:</h4><div><pre>{this.state.data.completed}</pre></div><br/>
                    <br/>
                    <div>
                        {(typeof this.state.data.stdout === 'string')?
                                    (
                                        <h2>{this.state.data.stdout}</h2>
                                    ): (Object.getOwnPropertyNames(this.state.data.stdout).map((tile,i) => (
                                      <div id={i+"mocha"}><h4>{tile}:</h4><pre>{JSON.stringify(this.state.data.stdout[tile])}</pre></div>
                                    )))
                        }
                    </div>
                </CardText>
            </Card>
        );

    }
}

export default Mocha;
