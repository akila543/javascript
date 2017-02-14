import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar';
import {List, ListItem} from 'material-ui/List';
import SwipeableViews from 'react-swipeable-views';
import RaisedButton from 'material-ui/RaisedButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
//import FlatButton from 'material-ui/FlatButton'

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
export default class Monitoring extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
      jobId:'',
      stageName:'',
      stages:[{name:"clone"},{name:"build"},{name:"eslint"},{name:"htmlhint"}],
      subtitle:"",
      data:[{id:"CI-Pipeline_124"},{id:"DISTRIBUTED-PIPELINE_3"},{id:"Pied-Piper_5"},{id:"Travis-CI_3"}]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePrevSlide = this.handlePrevSlide.bind(this);
    this.handleCellClick = this.handleCellClick.bind(this);
    this.handleStageName = this.handleStageName.bind(this);
  }

  handlePrevSlide () {
  	value--;
    this.setState({slideIndex: value });
  };

  handleStageName(row,column,event){
  value++;
  this.setState({slideIndex: value });
  this.setState({stageName:this.state.stages[row].name});
  }
  handleChange()
  {
  	alert('aksdmmdp');
  //this.setState({subtitle:"Clone"});
  }
  handleCellClick(row,column,event)
	{
	    value++;
	    this.setState({slideIndex: value });
      this.setState({jobId:this.state.data[row].id});
	}

  render() {

    return (

      <div>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleSlide}>
          <div>
          <h1>JOB LIST</h1>
				  <Table onCellClick= {this.handleCellClick} >
				    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
				      <TableRow onClick={this.handleChange} >
				        <TableHeaderColumn>Job ID</TableHeaderColumn>
				        <TableHeaderColumn>Job Name</TableHeaderColumn>
				        <TableHeaderColumn>Job Status</TableHeaderColumn>
				      </TableRow>
				    </TableHeader>
				    <TableBody onClick={this.handleChange} showRowHover={true} displayRowCheckbox={false}>
				      <TableRow onRowClick={this.handleChange}>
				        <TableRowColumn>CI-Pipeline_124</TableRowColumn>
				        <TableRowColumn>CI-Pipeline</TableRowColumn>
				        <TableRowColumn>Complete</TableRowColumn>
				      </TableRow>
				      <TableRow>
				        <TableRowColumn>DISTRIBUTED-PIPELINE_3</TableRowColumn>
				        <TableRowColumn>DISTRIBUTED-PIPELINE</TableRowColumn>
				        <TableRowColumn>Complete</TableRowColumn>
				      </TableRow>
				      <TableRow>
				        <TableRowColumn>Pied-Piper_5</TableRowColumn>
				        <TableRowColumn>Pied-Piper</TableRowColumn>
				        <TableRowColumn>Failed</TableRowColumn>
				      </TableRow>
				      <TableRow>
				        <TableRowColumn>Travis-CI_3</TableRowColumn>
				        <TableRowColumn>Travis-CI</TableRowColumn>
				        <TableRowColumn>Complete</TableRowColumn>
				      </TableRow>
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
