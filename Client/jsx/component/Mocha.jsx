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
          else   if (this.state.data.status === 'Failed')
              var avatar = "../jsx/images/avatar2.jpeg";
          else if(this.state.data.status==='Blocked')
              var avatar="../jsx/images/block.png";
          else {
            var avatar="../jsx/images/pending.png";
          }
          return (
              <Card >
                  <CardHeader title="Mocha" avatar={avatar} subtitle={this.state.data.status} actAsExpander={true} showExpandableButton={true}/>
                  <CardText expandable={true}>
                    <h4>ExitCode:</h4><div><pre>{this.state.data.exitCode}</pre></div><br />
                    <h4>Initialized@:</h4><div><pre>{this.state.data.initialized}</pre></div><br />
                    <h4>scheduled@:</h4><div><pre>{this.state.data.scheduled}</pre></div><br />
                    <h4>completed@:</h4><div><pre>{this.state.data.completed}</pre></div><br/>
                  <h4>Errors:</h4><div><pre>{this.state.data.stderr}</pre></div><br />


                      <div>
                        {(typeof this.state.data.stdout === 'string'|| this.state.data.stdout===undefined)?
                                    (
                                        <div><h4>Output</h4><div><pre>{this.state.data.stdout}</pre></div><br /></div>
                                    ):(
                                      <div>  <h4>Tests:</h4>
                          {

        <Table showCheckbox={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
        <TableRow>
          <TableHeaderColumn>Title</TableHeaderColumn>
          <TableHeaderColumn>Warning</TableHeaderColumn>
          <TableHeaderColumn>Status</TableHeaderColumn>
        </TableRow>
        </TableHeader>
         <TableBody showRowHover={true} displayRowCheckbox={false}>
        {this.state.data.stdout.tests.map((tile,i) => (
    <TableRow>
     <TableRowColumn id={i}> {tile[Object.keys(tile)[1]]}</TableRowColumn>
     <TableRowColumn id={i+1}>{JSON.stringify(tile[Object.keys(tile)[4]])}</TableRowColumn>
     <TableRowColumn id={i+2}>{(JSON.stringify(tile[Object.keys(tile)[4]])!='{}')?
       (<div><img src="../jsx/images/errorStat.jpg"></img></div>):(<div><img src="../jsx/images/passStat.png"></img></div>)}</TableRowColumn>
    </TableRow>

    ))}
    </TableBody>
    </Table>}
  </div>
)}</div>
                  </CardText>
              </Card>
          );

      }
  }

  export default Mocha;
