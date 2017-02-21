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
                    Status = {this.state.data.status}<br/>
                    Initialized@= {this.state.data.initialized}<br/>
                    scheduled@= {this.state.data.scheduled}<br/>
                    completed@={this.state.data.completed}

                    <br/>
                    <div>
                        <Table showCheckbox={false}>
                            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                <TableRow>
                                    <TableHeaderColumn>filePath</TableHeaderColumn>
                                    <TableHeaderColumn>messages</TableHeaderColumn>
                                    <TableHeaderColumn>errorCount</TableHeaderColumn>
                                    <TableHeaderColumn>warningCount</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody showRowHover={true} displayRowCheckbox={false}>
                                {(typeof this.state.data.stdout === 'string')?
                                    (
                                        <h1>{this.state.data.stdout}{count++}</h1>
                                    ): this.state.data.stdout.map((tile) => (
                                        <TableRow>
                                            <TableRowColumn>
                                                {tile[Object.keys(tile)[0]]}</TableRowColumn>
                                            <TableRowColumn>
                                                {tile[Object.keys(tile)[1]]}</TableRowColumn>
                                            <TableRowColumn>
                                                {tile[Object.keys(tile)[2]]}</TableRowColumn>
                                            <TableRowColumn>
                                                {tile[Object.keys(tile)[3]]}</TableRowColumn>
                                        </TableRow>

                                    ))
                                }
}
                            </TableBody>
                        </Table>

                    </div>
                </CardText>
            </Card>
        );

    }
}

export default Mocha;
