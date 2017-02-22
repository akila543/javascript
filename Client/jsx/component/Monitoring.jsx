import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar';
import {List, ListItem} from 'material-ui/List';
import SwipeableViews from 'react-swipeable-views';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Request from 'superagent';
import io from 'socket.io-client';
import HtmlHint from './HtmlHint.jsx';
import Build from './Build.jsx';
import Eslint from './Eslint.jsx';
import Mocha from './Mocha.jsx';
import CodeCoverage from './CodeCoverage.jsx';

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400
    },
    slide: {
        padding: 10
    }
};

var value = 0;
//var jobListArray = [];
var jobComponent = [];
export default class Monitoring extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            socket: io.connect('http://localhost:3000/monitor'),
            slideIndex: 0,
            jobId: '',
            stageName: '',
            jobTable: [],
            stageArr: [],
            data: []
        };
        this.clickHandler1 = this.clickHandler1.bind(this);
        this.handlePrevSlide = this.handlePrevSlide.bind(this);
        this.handleCellClick = this.handleCellClick.bind(this);
        this.handleStageName = this.handleStageName.bind(this);
    }

    handlePrevSlide() {
        value--;
        this.setState({slideIndex: value});
    }

    clickHandler1(e) {
        e.preventDefault();
        console.log('clicked');
        this.state.socket.emit('stop', 'Stop monitoring');
    }

    componentDidMount()
    {
        var that = this;
        Request.post('/joblist').set('Accept', 'application/json').end(function(err, res) {
            if (err || !res.ok)
                alert('Oh no! error');
            else {
                that.setState({
                    data: JSON.parse(res.text)
                })
                var jobListArray = [];
                JSON.parse(res.text).map((item, i) => {
                    console.log(item);
                    jobListArray.push(
                        <TableRow key={i}>
                            <TableRowColumn key={i + item.jobId}>{item.jobId}</TableRowColumn>
                            <TableRowColumn key={i + item.jobId}>{item.jobId.split('_')[0]}</TableRowColumn>
                            <TableRowColumn key={i + item.jobId}>{item.status}</TableRowColumn>
                        </TableRow>
                    );
                })

                that.setState({jobTable: jobListArray});
            }
        });
    }

    handleStageName(row, column, event) {
        value++;
        this.setState({slideIndex: value});
        this.setState({stageName: this.state.stages[row].name});
    }
    handleCellClick(row, column, event)
    {
        value++;
        this.setState({slideIndex: value});
        var id = this.state.data[row].jobId;
        this.setState({jobId: id});
        var that = this;
        var socket = this.state.socket;
        socket.emit('getjobstatus', id);
        socket.on('report', function(data) {
            if (data.status === 'Monitoring Stopped') {
                that.setState({stageArr: (
                        <h1>Monitoring Stopped</h1>
                    )});
            } else {
                console.log(data.jobId, data.stageName, data.status);
                switch (data.stageName) {
                    case 'build':
                        that.setState({stageArr1: (<Build res={data}/>)});
                        break;
                    case 'eslint':
                        that.setState({stageArr2: (<Eslint res={data}/>)});
                        break;
                    case 'htmlhint':
                        that.setState({stageArr3: (<HtmlHint res={data}/>)});
                        break;
                    case 'code-coverage':
                        that.setState({stageArr4: (<CodeCoverage res={data}/>)});
                        break;
                    case 'whitebox':
                        that.setState({stageArr5: (<Mocha res={data}/>)});
                        break;
                    default:
                        that.setState({stageArr6: (
                                <div>
                                    <h2 style={{color:'#FFA500'}}>{data.jobId} Status:{data.status}</h2>
                                </div>
                            )});
                }
            }
        });
    }

    componentWillUnmount() {
        console.log('Stopping the monitoring...');
        this.state.socket.emit('stop', 'Stop monitoring');
    }

    render() {

        return (

            <div>
                <SwipeableViews index={this.state.slideIndex}>
                    <div>
                        <h1>JOB LIST</h1>
                        <Table onCellClick={this.handleCellClick}>
                            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                <TableRow onClick={this.handleChange}>
                                    <TableHeaderColumn>Job ID</TableHeaderColumn>
                                    <TableHeaderColumn>Template Name</TableHeaderColumn>
                                    <TableHeaderColumn>Job Status</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody showRowHover={true} displayRowCheckbox={false}>

                                {this.state.jobTable}

                            </TableBody>
                        </Table>
                    </div>

                    <div style={styles.slide}>
                        <h1>Report</h1>
                        <FlatButton label="Stop Monitoring" onClick={this.clickHandler1}/>
                        <form method="get" action="../../../Server/workflows/CI-Pipeline.yml">
                            <button type="submit">Download!</button>
                        </form>
                        {this.state.stageArr6}
                        {this.state.stageArr1}
                        {this.state.stageArr2}
                        {this.state.stageArr3}
                        {this.state.stageArr4}
                        {this.state.stageArr5}
                        <RaisedButton onClick = {this.handlePrevSlide} label="Back" primary={true} style ={{marginLeft:'80%'}}  />
                        <a href="../../../Server/reports/CI-Pipeline.yml_5.json">
                            <button type="submit">Download!</button>
                        </a>
                    </div>
                </SwipeableViews>
            </div>
        );
    }
}
