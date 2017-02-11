import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
class CodeCoverage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      result:false,

    };

  }

  render() {
    var avatar="./images/avatar2.jpg";
    if(this.state.result)
  { console.log("gjg");
    avatar="./images/avatar1.jpg";
  }

    return (
      <Card >
        <CardHeader
          title="CodeCoverage"
          avatar={avatar}
          actAsExpander={true}
          showExpandableButton={true}
        />
      <CardTitle title="CodeCoverage Report" expandable={true} />
        <CardText expandable={true}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
      </Card>
    );

  }
}
export default CodeCoverage;
