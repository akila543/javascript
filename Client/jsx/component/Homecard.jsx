import React from 'react';
import ReactDOM from 'react-dom';
import {GridList, GridTile} from 'material-ui/GridList';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import {Grid,Row,Col} from 'react-flexbox-grid/lib';




class Homecard extends React.Component {
  render() {
    return (
    <Grid style={{height:"40vh",width:"100%",marginTop:'6.5%'}}>
      <center><h1> Features</h1></center>
                <Row style={{height:"30%",width:"100%"}}>
                  <Col xs={12} sm={3} md={3} lg={3} style={{height:"100%"}}>
                  <Card>
                  <CardText>
                  <CardTitle title="Deployement Pipelines"/>
    Our native deployment pipelines, Get fast feedback by breaking up tests into stages,
     in multiple environments .

  </CardText>
  </Card>
                  </Col>
<Col xs={12} sm={3} md={3} lg={3} style={{height:"100%"}}>
                  <Card>
                  <CardText>
                    <CardTitle title="Run Parallely"/>
                    Get faster feedback by running pipelines and tests in parallel.
                    Get deployment-ready reliably and with ease.
                    </CardText>
  </Card>
  </Col>

                  <Col xs={12} sm={3} md={3} lg={3} style={{height:"100%"}}>

                  <Card>
                  <CardText>
                  <CardTitle title="Optimized infrastructure"/>
    Don't waste time maintaining your own testing server.
     Our infrastructure is built for efficiency and scales with your needs.
  </CardText>
  </Card>

                  </Col>

                  <Col xs={12} sm={3} md={3} lg={3} style={{height:"100%"}}>
                  <Card>
                  <CardText>
                  <CardTitle title="Distributed"/>
                  Octopus can easily distribute work across multiple machines,
                   helping drive builds, tests and deployments across multiple platforms faster.


  </CardText>
  </Card>
                  </Col>
                </Row>
              </Grid>
    )
  }
}
export default Homecard;
