import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import SwipeableViews from 'react-swipeable-views';
import WorkFlowEdit from './WorkFlowEdit.jsx';
import AddTemplate from './AddTemplate.jsx';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Divider from 'material-ui/Divider';
import {GridList, GridTile} from 'material-ui/GridList';
import request from 'superagent';

const cellStyle={
  width:"30%"
};

class WorkFlowList extends React.Component{
  constructor(props){
    super(props);
    this.state={name:'',worklist:[], isEdit:{false}, slideIndex:0,content:'',templateName:""}
    this.handleDelete=this.handleDelete.bind(this);
    this.handleEdit=this.handleEdit.bind(this);
    this.handleAdd=this.handleAdd.bind(this);
    this.handlePrevSlide=this.handlePrevSlide.bind(this);
  }

  componentWillMount(){
  var that = this;
  request
   .get('/workflows')
   .set({ 'API-Key': 'foobar', Accept: 'application/json' })
   .end(function(err,res){
     if (err) {
       console.log(err);
     }
     else {
       that.setState({worklist:JSON.parse(res.text)});
       console.log("___________________"+this.state.worklist);
     }
   });
  }

  handleDelete(e){
    var id=e.target.id;
    const a=this.state.worklist.filter(function(item) {
        return item._id === id;                                //id is considered as integer
    });
    console.log(a);
    request.post('/workflows/delete')
    .set('Content-Type', 'application/json')
    .send(a[0])
    .end(function(err,res){
      if (err) {
        console.log(err);
      }
      else {
        console.log(res);
      }
    });
    const b=this.state.worklist.filter(function(item) {
        return item._id !== id;                                //id is considered as integer
    });
    this.setState({worklist:b});
  }

  handlePrevSlide () {
    this.setState({slideIndex:0 });
  }

  handleEdit(event)
	{
    var id=event.target.id;
    console.log(id);
      const obj=this.state.worklist.filter(function(item){
        console.log(item._id);
        return item._id === id;
      });
      console.log(obj);
      var data=obj[0].content;
	    this.setState({slideIndex:1,templateName:obj[0].templateName,content: data});
      console.log(this.state.content);
	}

  handleAdd()
  {
    this.setState({slideIndex:2})
  }
  render(){
    console.log(this.state.worklist);
    var box=<FloatingActionButton mini={true} onClick={this.handleAdd} style={{marginTop:"2%",marginRight:"2%" }}>
      <ContentAdd />
    </FloatingActionButton>
   return(
     <div>
       <SwipeableViews
         index={this.state.slideIndex}>
         <div>
           <GridList cellHeight='auto' col={2} style={{textAlign:"left"}} >
             <h1>WorkFlows</h1>
             <div style={{textAlign:"right"}}>
               {box}
             </div>
           </GridList>
           <Divider/>
          <Table style={{width:"100%"}}>
             <TableBody displayRowCheckbox={false}>
               {this.state.worklist.map((item)=>(
                 <TableRow >
                   <TableRowColumn style={cellStyle}>
                     {item.templateName}
                   </TableRowColumn>
                   <TableRowColumn >
                       <FlatButton
                         label="Edit"
                         id={item._id}
                         onClick={this.handleEdit}
                         primary={true}
                        />
                   </TableRowColumn>
                   <TableRowColumn >
                     <FlatButton
                       label="Delete"
                       id={item._id}
                       secondary={true}
                       onClick={this.handleDelete}
                     />
                   </TableRowColumn>
                 </TableRow>
               )
               )}
             </TableBody>
           </Table>
         </div>
         <div>
           <WorkFlowEdit data={this.state.content} templateName={this.state.templateName}/>
           <RaisedButton  onClick = {this.handlePrevSlide} label="Back" primary={true} style ={{marginLeft:'80%'}}/>
         </div>
         <div>
           <AddTemplate/>
           <RaisedButton  onClick = {this.handlePrevSlide} label="Back" primary={true} style ={{marginLeft:'80%'}}/>
         </div>
       </SwipeableViews>

     </div>


    );
  }
}

export default WorkFlowList;
