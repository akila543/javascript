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
import {Link, hashHistory} from 'react-router';
import io from 'socket.io-client';
import HtmlHint from './HtmlHint.jsx';
import Build from './Build.jsx';
import Eslint from './Eslint.jsx';
import Mocha from './Mocha.jsx';
import CodeCoverage from './CodeCoverage.jsx';
import Results from './Results.jsx';
import {Chart} from 'react-google-charts';
import TitleCardResult from './TitleCardResult.jsx';
import newUser from './NewUser.jsx';
import DashNavbar from './DashNavbar.jsx';
var fileDownload = require('react-file-download');
export default class User extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            data2: [],
            options: {
                colors: ['#e0440e'],
                title: 'Toppings I Like On My Pizza'
            }
        };
        this.state = {
            jobId:this.props.params.jobId,
            isSubmit: false,
            socket: io.connect('http://localhost:3000/monitor'),
            box:<h2 style={{color: '#FFA500',textAlign:'center'}}>Reports are getting Generated</h2>
        };
          this.handleLogout=this.handleLogout.bind(this);
          this.drawCharts = this.drawCharts.bind(this);
          this.handleDownload = this.handleDownload.bind(this);
    }
    componentWillReceiveProps(nextProps) {
      console.log("joId=====>",nextProps.params.jobId);
      this.setState({jobId:nextProps.params.jobId});
  }
  handleLogout()
    {
        cookie.remove("access_token");
        cookie.remove("type");
    }

handleDownload()
{
  var that = this;
 Request.get('/download/'+that.state.jobId).end((err,res)=>{
   if(err)
     console.log(err);
   else{
    console.log(res.text);
    fileDownload(res.text,that.state.jobId+".json");
   }
 })
}

    componentWillMount()
    {

            var userid=cookie.load('user');

            var that = this;
            var socket = that.state.socket;
            socket.emit('getjobstatus',{jobId:this.state.jobId,userId:userid});
            socket.on('report', function(data) {
                if (data.status === 'Monitoring Stopped') {
                    that.setState({stageArr: (
                            <h1>Monitoring Stopped</h1>
                        )});
                } else
                {
                            console.log(data.jobId, data.stageName, data.status);
                            switch (data.stageName) {
                                case 'build':
                                    that.setState({stageArr1: (<Build res={data}/>)});
                                    that.setState({stage1: data.status, box:null});
                                    break;
                                case 'eslint':
                                    that.setState({stageArr2: (<Eslint res={data}/>)});
                                    that.setState({stage2: data.status,box:null});
                                    break;
                                case 'htmlhint':
                                    that.setState({stageArr3: (<HtmlHint res={data}/>)});
                                    that.setState({stage3: data.status,box:null})
                                    break;
                                case 'code-coverage':
                                    that.setState({stageArr4: (<CodeCoverage res={data}/>)});
                                    that.setState({stage4: data.status,box:null})
                                    break;
                                case 'whitebox':
                                    that.setState({stageArr5: (<Mocha res={data}/>)});
                                    that.setState({stage5: data.status,box:null})
                                    break;
                                default:
                                    that.setState({stageArr6: (
                                            <div>
                                                <h4 style={{
                                                    color: '#FFA500'
                                                }}>{data.jobId}
                                                    Status:{data.status}</h4>
                                            </div>

                                        )});
                                    that.setState({stage6: data.status,box:null});
                                    that.drawCharts();
                                    break;
                            }
                        }
                    });


    }
    drawCharts(){
        console.log("inside geting reports");
        var that=this;
          Request.get('/getreports/'+this.state.jobId).set('Accept', 'application/json').end(function(err, res) {
              if (!err) {
                  console.log("reports",res,"====================",typeof res);
                  var tempArr = new Array();
                  tempArr.push(["sdasd", new Date(), new Date()]);
                  JSON.parse(res.text)[0].report.map(function(item) {
                      if (item != null) {
                          var arr = [];
                          var stageName = item.stageName;
                          var scheduled = new Date(item.scheduled);;
                          var completed = new Date(item.completed);;
                          arr.push(stageName, scheduled, completed);
                          tempArr.push(arr);
                      }
                  });
                  that.setState({data2:tempArr});
              }
          })
      }


    render() {
            var timeline=null;

          if(this.state.data2!=null){
            console.log("inside google api",this.state.data2);
            timeline=(<div>
                  <Chart chartType="Timeline" data={this.state.data2} graph_id="Timeline" options={this.state.options} width="100%"/>
                  <RaisedButton label="Download Reports" secondary={true} onClick={this.handleDownload}/>
                </div>);
        }
        var bar=null;
          if(cookie.load('type')=='user')
          bar=<AppBar title={"Hello "+cookie.load("user")} iconElementRight={< Link to = "/" > <FlatButton label="Logout" labelStyle={{color:"white"}} onClick={this.handleLogout}/> < /Link>}/>
            else if(cookie.load('type')=='admin'){
    					bar=<DashNavbar/>
    				}

        return (
                <div>
                  {bar}
                  <TitleCardResult/>
                <Grid style={{
                    marginTop: "1%"
                }}>
                    <Row style={{
                        marginTop: "1%"
                    }} >
                        <Col lg={12}>
                            <div >
                                {this.state.box}
                                {this.state.stageArr6}
                                {timeline}
                                {this.state.stageArr1}
                                {this.state.stageArr2}
                                {this.state.stageArr3}
                                {this.state.stageArr4}
                                {this.state.stageArr5}
                            </div>

                        </Col>
                        </Row>
                </Grid>
                  </div>
        );
    }
}
