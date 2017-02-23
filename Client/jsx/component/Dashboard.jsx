import React from 'react';
import ReactDOM from 'react-dom';
import {Grid,Row,Col} from 'react-flexbox-grid/lib';
import DashNavbar from './DashNavbar.jsx';
import Paper from 'material-ui/Paper';


const style = {
  paper:{height: 'auto',
  width: "80%",
  margin: '50px 0 0 150px',
  textAlign: 'center',
  display: 'inline-block',
}
};

class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render()
  {
    return (
      <div>

        <Grid style={{width:'100%'}}>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12}>   <DashNavbar /> {this.props.children} </Col>

                </Row>
              </Grid>
      </div>
    );
  }
}

export default Dashboard;
