import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar';
import {List, ListItem} from 'material-ui/List';
import SwipeableViews from 'react-swipeable-views';
import RaisedButton from 'material-ui/RaisedButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Request from 'superagent';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 10,
  },
};

var value = 0;
var jobListArray=[];
var jobComponent=[];
export default class Monitoring extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
      jobId:'',
      stageName:'',
      jobTable:[],
      stages:[{name:"clone"},{name:"build"},{name:"eslint"},{name:"htmlhint"}],
      subtitle:"",
      data:[{id:"CI-Pipeline_124"},{id:"DISTRIBUTED-PIPELINE_3"},{id:"Pied-Piper_5"},{id:"Travis-CI_3"}]
    };

    this.handlePrevSlide = this.handlePrevSlide.bind(this);
    this.handleCellClick = this.handleCellClick.bind(this);
    this.handleStageName = this.handleStageName.bind(this);
  }

  handlePrevSlide () {
  	value--;
    this.setState({slideIndex: value });
  }

  componentDidMount()
  {
    var that = this;
        Request.post('/jobList').set('Accept', 'application/json')
        .end(function(err, res){
          if (err || !res.ok)
            alert('Oh no! error');
          else
          {
              that.setState({data:JSON.parse(res.text)})
             JSON.parse(res.text).map((item,i)=>{
              jobListArray.push(
              <TableRow key={i}>
                <TableRowColumn key={i+"1"}>{item.jobId}</TableRowColumn>
                <TableRowColumn key={i+"2"}>{item.jobId.split('_')[0]}</TableRowColumn>
                <TableRowColumn key={i+"3"}>{item.status}</TableRowColumn>
              </TableRow>);
             })

             that.setState({jobTable:jobListArray});
          }
             });
  }

  handleStageName(row,column,event){
  value++;
  this.setState({slideIndex: value });
  this.setState({stageName:this.state.stages[row].name});
  }
  handleCellClick(row,column,event)
	{
	    value++;
	    this.setState({slideIndex: value });
      console.log(this.state.data);
      this.setState({jobId:this.state.data[row]});
	}

  render() {

    return (

      <div>
        <SwipeableViews
          index={this.state.slideIndex}>
          <div>
          <h1>JOB LIST</h1>
				  <Table onCellClick= {this.handleCellClick} >
				    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
				      <TableRow onClick={this.handleChange} >
				        <TableHeaderColumn>Job ID</TableHeaderColumn>
				        <TableHeaderColumn>Template Name</TableHeaderColumn>
				        <TableHeaderColumn>Job Status</TableHeaderColumn>
				      </TableRow>
				    </TableHeader>
				    <TableBody  showRowHover={true} displayRowCheckbox={false}>

				      {this.state.jobTable}

				    </TableBody>
				  </Table>
          </div>


          <div style={styles.slide}>
          <h1>STAGES LIST</h1>
          <Table onCellClick= {this.handleStageName} >
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow onClick={this.handleChange} >
                <TableHeaderColumn>Stage Name</TableHeaderColumn>
                <TableHeaderColumn>Stage Status</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody onClick={this.handleChange} showRowHover={true} displayRowCheckbox={false}>
              <TableRow onRowClick={this.handleChange}>
                <TableRowColumn>Clone</TableRowColumn>
                <TableRowColumn>Complete</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Build</TableRowColumn>
                <TableRowColumn>Complete</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>eslint</TableRowColumn>
                <TableRowColumn>In Progress</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>htmlhint</TableRowColumn>
                <TableRowColumn>In Progress</TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
          <RaisedButton  onClick = {this.handlePrevSlide} label="Back" primary={true} style ={{marginLeft:'80%'}}/>
          </div>
          <div style={styles.slide}>
          <h1>STAGE DETAILS</h1>
          <Card>
    <CardHeader
      title="Details"
      subtitle={this.state.stageName}
      actAsExpander={true}
      showExpandableButton={true}
    />

    <CardText expandable={true}>
      Exit code : 0
      <br></br>
      Stdout    : output
      <br></br>
      Stderr    : error!
      <br></br>
    </CardText>
  </Card>
          <RaisedButton onClick = {this.handlePrevSlide}label="Back" primary={true} style ={{marginLeft:'80%'}}  />

          </div>
        </SwipeableViews>
      </div>
    );
  }
}
