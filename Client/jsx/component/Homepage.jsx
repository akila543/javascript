import ReactDOM from 'react-dom';
import React from 'react';
import {Grid,Row,Col} from 'react-flexbox-grid/lib';
import Navbar_Homepage from '../component/Navbar_Homepage.jsx';
import Body_Homepage from '../component/Body_Homepage.jsx'
//import Hero_Homepage from '../component/Hero_Homepage.jsx';
import Footer_Homepage from '../component/Footer_Homepage.jsx';
import Workflow_Homepage from '../component/Workflow_Homepage.jsx';
import Homecard from '../component/Homecard.jsx';
import Homecard1 from '../component/Homecard1.jsx';
class Homepage extends React.Component {

  render()
  {
    return (

      <Grid style={{width:'100%'}}>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12}><Navbar_Homepage/> </Col>

                </Row>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12}><Body_Homepage /> </Col>

                  </Row>

                        <Row>
                          <Col xs={12} sm={12} md={12} lg={12}><Homecard/> </Col>

                          </Row>
                          <Row>
                            <Col xs={12} sm={12} md={12} lg={12}><Homecard1/> </Col>

                            </Row>
                            <Row>
                              <Col xs={12} sm={12} md={12} lg={12}><Workflow_Homepage/> </Col>

                              </Row>
                        <Row>
                          <Col xs={12} sm={12} md={12} lg={12}><Footer_Homepage/> </Col>

                          </Row>

            </Grid>

    );
  }
}

export default Homepage;
