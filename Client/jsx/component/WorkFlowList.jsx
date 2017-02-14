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

const cellStyle={
  width:"30%"
};

const templist=[{id:1, name:"workflow1",content:"my content"},{id:2,name:"workflow2"},{id:3, name:"workflow3"}];

class WorkFlowList extends React.Component{
  constructor(props){
    super(props);
    this.state={name:'',worklist:templist, isEdit:{false}, slideIndex:0}
    this.handleDelete=this.handleDelete.bind(this);
    this.handleEdit=this.handleEdit.bind(this);
    this.handleAdd=this.handleAdd.bind(this);
    this.handlePrevSlide=this.handlePrevSlide.bind(this);
  }

  handleDelete(e){
    var id=e.target.id;
    const a=this.state.worklist.filter(function(item) {
        return item.id !== parseInt(id);                                //id is considered as integer
    });
    this.setState({worklist:a});
  }

  handlePrevSlide () {
    this.setState({slideIndex:0 });
  }

  handleEdit(event)
	{   var id=event.target.id;
      const obj=this.state.worklist.filter(function(item){
        return item.id == parseInt(id);
      });
      var data=obj[0].content;
	    this.setState({slideIndex:1,content: data});
      console.log(this.state.content);

	}

  handleAdd()
  { 
    this.setState({slideIndex:2})
  }
  render(){
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
                     {item.name}
                   </TableRowColumn>
                   <TableRowColumn >
                       <FlatButton
                         label="Edit"
                         id={item.id}
                         onClick={this.handleEdit}
                         primary={true}
                        />
                   </TableRowColumn>
                   <TableRowColumn >
                     <FlatButton
                       label="Delete"
                       id={item.id}
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
           <WorkFlowEdit data={this.state.content}/>
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
