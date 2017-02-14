import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';

const cellStyle={
  width:"30%"
};

const templist=[{id:1, name:"workflow1"},{id:2,name:"workflow2"},{id:3, name:"workflow3"}];

class WorkFlowList extends React.Component{
  constructor(props){
    super(props);
    this.state={name:'',worklist:templist, isEdit:{false}}
    this.handleDelete=this.handleDelete.bind(this);
  }

  handleDelete(e){
    var id=e.target.id;
    const a=this.state.worklist.filter(function(item) {
        return item.id !== parseInt(id);
    });
    this.setState({worklist:a});
  }


  render(){
   return(
     <div>
       <Table style={{width:"100%"}}>
         <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
           <h1>WorkFlows</h1>
         </TableHeader>
         <TableBody displayRowCheckbox={false}>
           {this.state.worklist.map((item)=>(
             <TableRow >
               <TableRowColumn style={cellStyle}>
                 {item.name}
               </TableRowColumn>
               <TableRowColumn >
                 <Link to="/edit">
                   <RaisedButton
                     label="Edit"
                     primary={true}
                    />
                 </Link>
               </TableRowColumn>
               <TableRowColumn >
                 <RaisedButton
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


    );
  }
}

export default WorkFlowList;
