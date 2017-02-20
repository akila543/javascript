import React from 'react';
import ReactDOM from 'react-dom';
import {GridList, GridTile} from 'material-ui/GridList';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import {Grid,Row,Col} from 'react-flexbox-grid/lib';




class Homecard1 extends React.Component {
  render() {
    return (
<Grid style={{height:"40vh",width:"100%",marginTop:-'20%'}}>
    <center><h1> Build and Test with Confidence</h1></center>
    <br></br>
                <Row style={{height:"30%",width:"100%"}}>
                  <Col xs={12} sm={6} md={6} lg={6} style={{height:"100%"}}>
                  <Card>
                  <CardText >
                  <CardTitle title="Continuous Integration & Delivery as a Service"/>
A simple push to your repository runs your automated tests and configured deployments on our powerful machines.
 From a simple deployment to complex Deployment Pipelines for your large infrastructure,
 all can be set up with ease.
  </CardText>
  </Card>
                  </Col>
<Col xs={12} sm={6} md={6} lg={6} style={{height:"100%"}}>
                  <Card>
                  <CardText>
<img src="../jsx/images/CI.jpg" style={{height:'123px',width:'100%'}} />
  </CardText>
  </Card>
  </Col>

                </Row>
              </Grid>
    )
  }
}
export default Homecard1;
