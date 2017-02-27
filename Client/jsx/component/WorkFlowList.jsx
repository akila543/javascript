import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import SwipeableViews from 'react-swipeable-views';
import WorkFlowEdit from './WorkFlowEdit.jsx';
import AddTemplateEdit from './AddTemplateEdit.jsx';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Divider from 'material-ui/Divider';
import {GridList, GridTile} from 'material-ui/GridList';
import request from 'superagent';
import {Grid,Row,Col} from 'react-flexbox-grid/lib';

const cellStyle={
  width:"30%"
};

class WorkFlowList extends React.Component{
  constructor(props){
    super(props);
    this.state={name:'',worklist:[], isEdit:{false}, slideIndex:0,content:'',templateName:"", transfunction:""}
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
    window.location.reload();
    this.setState({slideIndex:0 });
  }

  handleEdit(event)
	{
    var id=event.target.id;
      const obj=this.state.worklist.filter(function(item){
        return item._id === id;
      });
      var data=(obj[0].content);
      console.log(data);
	    this.setState({slideIndex:1,templateName:obj[0].templateName,content: data, transfunction:obj[0].transFunction});
	}

  handleAdd()
  {
    this.setState({slideIndex:2})
  }
  render(){

   var box=<FloatingActionButton mini={true} onClick={this.handleAdd} style={{marginTop:"2%",marginRight:"2%", }}>
      <ContentAdd />
    </FloatingActionButton>

   return(
     <div>
       <SwipeableViews
         index={this.state.slideIndex}>

         <div>
           <Grid style={{width:"95%"}}>
             <Row>
               <Col xs={10} sm={10} md={10} lg={10}>
                  <h1>WorkFlows</h1>
               </Col>
               <Col xs={2} sm={2} md={2} lg={2}>
                 <div style={{textAlign:"right"}}>
                   {box}
                 </div>
               </Col>

             </Row>
           </Grid>

           <Divider/>
          <Table>
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
                       style={{color:'#EF5350'}}
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
           <WorkFlowEdit data={this.state.content} filename={this.state.templateName} transfunction={this.state.transfunction} />
         </div>
         <div>
           <AddTemplateEdit/>
         </div>
       </SwipeableViews>

     </div>


    );
  }
}

export default WorkFlowList;
