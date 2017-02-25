import React from 'react';
import AppBar from 'material-ui/AppBar';
import {
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    CardTitle,
    CardText
} from 'material-ui/Card';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import cookie from 'react-cookie';
import Request from 'superagent';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import {Link, hashHistory} from 'react-router';
import io from 'socket.io-client';
import HtmlHint from './HtmlHint.jsx';
import Build from './Build.jsx';
import Eslint from './Eslint.jsx';
import Mocha from './Mocha.jsx';
import CodeCoverage from './CodeCoverage.jsx';
import Results from './Results.jsx';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
var validUrl = require('valid-url');
import {Chart} from 'react-google-charts';
var box = new Array();
export default class User extends React.Component {
    constructor(props)
    {
        super();
        this.state = {
            data2: [],
            options: {
                colors: ['#e0440e'],
                title: 'Toppings I Like On My Pizza'
            }
        };
        this.state = {
            templateContent: '',
            openTemplate: false,
            worklist: [],
            open: false,
            template: 'CI-Pipeline.yml',
            open1: false,
            UserName: 'user',
            isSubmit: false,
            repos: [],
            repoUrl: '',
            selectedRepo: '',
            testedRepo: [],
            socket: io.connect('http://localhost:3000/monitor')
        };
        this.handleRepo = this.handleRepo.bind(this);
        this.handleType = this.handleType.bind(this);
        this.handleUrl = this.handleUrl.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTouchTap = this.handleTouchTap.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
    }

    handleTouchTap(event) {
        // This prevents ghost click.
        var that = this;

        that.setState({open1: true, anchorEl: event.currentTarget});
    }

    handleRequestClose() {
        this.setState({open1: false});
    };
    handleType(e)
    {
        this.setState({selectedRepo: e.target.value});
        this.setState({repoUrl: e.target.value});
    }
    handleRepo()
    {
        var array = this.state.testedRepo;
        console.log(this.state.repoUrl);
        var temp = this.state.repoUrl.split('/');
        array.push(temp[3] + "/" + temp[4]);
        console.log(temp);
        this.setState({testedRepo: array});
    }
    {this.handleSubmit()}
}

handleOpen()
{
    this.setState({open: true});
}

handleClose()
{
    this.setState({open: false});
    handleSubmit()
    {

        var regexp = /http:\/\/github\.com\/*\/*/;

        if ((validUrl.isUri(this.state.selectedRepo)) && regexp.test(this.state.selectedRepo)) {
            box = [];
            this.setState({open: false});
            this.setState({isSubmit: true});
            var id = '';
            var that = this;
            console.log("template :", that.state.template);
            Request.post('/initiate').set('Accept', 'application/json').send({userName: cookie.load('user'), data: that.state.selectedRepo, templateName: that.state.template}).end(function(err, res) {
                if (err || !res.ok) {
                    alert('Oh no! error');
                } else {
                    id = res.text;
                    console.log(res.text); //getting the jobId
                    var userid = cookie.load('user');
                    console.log("cookie", userid);
                    var socket = that.state.socket;
                    socket.emit('getjobstatus', {
                        jobId: res.text,
                        userId: userid
                    });
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
                                    that.setState({stage1: data.status})break;
                                case 'eslint':
                                    that.setState({stageArr2: (<Eslint res={data}/>)});
                                    that.setState({stage2: data.status})break;
                                case 'htmlhint':
                                    that.setState({stageArr3: (<HtmlHint res={data}/>)});
                                    that.setState({stage3: data.status})break;
                                case 'code-coverage':
                                    that.setState({stageArr4: (<CodeCoverage res={data}/>)});
                                    that.setState({stage4: data.status})break;
                                case 'whitebox':
                                    that.setState({stageArr5: (<Mocha res={data}/>)});
                                    that.setState({stage5: data.status})break;
                                default:
                                    that.setState({stageArr6: (
                                            <div>
                                                <h4 style={{
                                                    color: '#FFA500'
                                                }}>{data.jobId}
                                                    Status:{data.status}</h4>

                                            </div>

                                        )});
                                    that.setState({stage6: data.status});
                                    break;
                            }
                        }
                    });
                }
            });
            if (this.state.stage6 != null) {
                Request.post('/getReport').set('Accept', 'application/json').send({jobId: id}).end(function(err, res) {
                    if (!err) {
                        var that = this;
                        res.map(function(item) {
                            if (item != null) {
                                var arr = [];
                                var stageName = item.stageName;
                                var scheduled = new Date(item.scheduled);;
                                var completed = new Date(item.completed);;
                                arr.push(stageName, scheduled, completed);
                                that.state.data2.push(arr);
                            }
                        });
                        var first = ["sdasd", new Date(), new Date()];
                        that.state.data2.unshift(first);
                    }
                })
            }
        } else {
            alert("Not a valid Url");
        }
    }
    handleLogout()
    {
        cookie.remove("access_token");
        cookie.remove("type");
    }

    handleUrl(e)
    {
        var temp = "http://github.com/" + e;
        this.setState({selectedRepo: temp, UserName: cookie.load('user')})
        var that = this;
        console.log(this.state.UserName, temp, '\n');
        Request.post('/userjoblist').set('Accept', 'application/json').send({user: cookie.load('user'), repoUrl: temp}).end(function(err, res) {
            if (err || !res.ok)
                alert('Oh no! error');
            else {
                console.log(res.text);
                if (res.text == '[]') {
                    {
                        that.handleOpen()
                    };
                } else {
                    JSON.parse(res.text).map((item, i) => {
                        console.log(item);
                        box.push(
                            <Card key={i}>
                                <CardHeader title={"Results for " + e} style={{
                                    backgroundColor: "#558B2F"
                                }}/>
                                <CardTitle title="Summary"/>
                                <CardText>
                                    {item.summary}<br/><br/>
                                    jobId:{item.jobId}<br/><br/>
                                    initiated at :{item.initiatedAt}<br/><br/>
                                    Template Name :{item.templateName}
                                </CardText>
                                <CardActions>
                                    <RaisedButton secondary={true} label="Test your Repo"/>
                                </CardActions>
                            </Card>
                        )
                    });
                    console.log(box);
                    that.setState({stateBox: box});
                }
            }
        })

    }

    componentWillMount()
    {
        var gitDetails = [];
        var tempRepos = [];
        var uName,
            aUrl;
        var that = this;
        console.log(cookie.load("repos_url") + "-------");
        Request.get(cookie.load("repos_url")).set('Accept', 'application/json').end(function(err, res) {
            if (err || !res.ok)
                alert('Oh no! error');
            else {
                gitDetails = res.body;
                gitDetails.map((item) => {
                    tempRepos.push(item.full_name);
                    uName = item.owner.login;
                    aUrl = item.owner.avatar_url;
                })
                that.setState({repos: tempRepos});
                that.setState({UserName: uName});
            }
        })
        Request.get('/workflows').set({'API-Key': 'foobar', Accept: 'application/json'}).end(function(err, res) {
            if (err) {
                console.log(err);

            } else {
                that.setState({
                    worklist: JSON.parse(res.text)
                });
            }
        });
        box.push(
            <Card style={{
                width: "100%"
            }}>
                <CardText style={{
                    color: "#3F51B5"
                }}>
                    <br/>
                    <h2 style={{
                        color: "#800000"
                    }}>Are your Repos deployable?</h2>
                    <h3>If not sure select a repo to test and let the orchestropus show you whether it is...</h3>
                </CardText>
            </Card>
        );
    }
    render() {

        const actions = [ < FlatButton label = "Cancel" primary = {
                true
            }
            onTouchTap = {
                this.handleClose
            } />, < FlatButton label = "Submit" primary = {
                true
            }
            keyboardFocused = {
                true
            }
            onTouchTap = {
                this.handleSubmit
            } />
        ];
        const actionsTemp = [< FlatButton label = "Ok" primary = {
                true
            }
            onTouchTap = {
                () => {
                    this.setState({openTemplate: false})
                }
            } />];
            const chart=null;
          if(this.state.data2!=null){
            chart=  <div style={{margin: "50px"}}>
                  <Chart chartType="Timeline" data={this.state.data2} graph_id="Timeline" options={this.state.options} width="60%" height="500px"/>
              </div>
        }

        return (
            <div>
                <AppBar title={"Hello " + this.state.UserName} iconElementRight={< Link to = "/" > <FlatButton label="Logout" labelStyle={{
                    color: "white"
                }} onClick={this.handleLogout}/> < /Link>}/>

                <Grid style={{
                    marginTop: "1%"
                }}>
                    <Row >

                        <Col xs={8} sm={8} md={8} lg={8}>
                            <TextField value={this.state.selectedRepo} floatingLabelText="Enter your git repo url" onChange={this.handleType}/>
                            <RaisedButton label="Submit" secondary={true} style={{
                                marginLeft: "2%"
                            }} onClick={this.handleRepo}/>

                        </Col>
                        <Col lg={4} style={{
                            position: "absolute",
                            top: "16%"
                        }}>
                            <RaisedButton onTouchTap={this.handleTouchTap} label="Choose Template"/>
                            <Popover open={this.state.open1} anchorEl={this.state.anchorEl} anchorOrigin={{
                                horizontal: 'left',
                                vertical: 'bottom'
                            }} targetOrigin={{
                                horizontal: 'left',
                                vertical: 'top'
                            }} onRequestClose={this.handleRequestClose}>
                                {this.state.worklist.map((item) => (
                                    <Menu>
                                        <MenuItem key={item} primaryText={item.templateName} onClick={() => {
                                            this.setState({
                                                template: item.templateName,
                                                templateContent: JSON.stringify(item.content),
                                                open1: false
                                            });
                                            console.log(JSON.stringify(item.content));
                                            this.setState({openTemplate: true});
                                        }}/>
                                    </Menu>
                                ))}
                            </Popover>

                        </Col>
                    </Row>
                    <Row style={{
                        marginTop: "1%"
                    }} around="xs">
                        <Col lg={5}>
                            <div >
                                {this.state.stageArr6}
                                {this.state.stageArr1}
                                {this.state.stageArr2}
                                {this.state.stageArr3}
                                {this.state.stageArr4}
                                {this.state.stageArr5}
                            </div>
                            {box}
                        </Col>
                        <Col lgOffset={1} lg={5} md={5} mdOffset={1} sm={7} smOffset={1} xs={12}>
                            <Card>
                                <CardHeader title="Your Repositories" style={{
                                    backgroundColor: "#BDBDBD"
                                }}/>
                                <CardText>
                                    <List>
                                        {this.state.repos.map(text => <ListItem key={text} primaryText={text} onClick={() => this.handleUrl(text)}/>)}
                                    </List>
                                </CardText>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                          {chart}
                        </Col>
                        <Col lgOffset={8} lg={4}>
                            <Card style={{
                                marginTop: "5%"
                            }}>
                                <CardHeader title="Tested Repositories" style={{
                                    backgroundColor: "#BDBDBD"
                                }}/>
                                <CardText>
                                    <List>
                                        {this.state.testedRepo.map(text => <ListItem key={text} primaryText={text} onClick={() => this.handleUrl(text)}/>)}
                                    </List>
                                </CardText>
                            </Card>
                        </Col>
                    </Row>
                </Grid>
                <Dialog title="It seems no results associated with this repo. Do you wish to test this repo?" actions={actions} modal={false} open={this.state.open} onRequestClose={this.handleClose}></Dialog>
                <Dialog title="Template Viewer" actions={actionsTemp} modal={false} open={this.state.openTemplate} onRequestClose={this.handleClose} autoScrollBodyContent={true}>
                    {this.state.templateContent}

                </Dialog>
            </div>
        );
    }
}
