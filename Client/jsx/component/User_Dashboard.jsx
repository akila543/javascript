import React from 'react';
import ReactDOM from 'react-dom';
import {Grid,Row,Col} from 'react-flexbox-grid/lib';
import DashNavbar from './DashNavbar.jsx';
import Paper from 'material-ui/Paper';
import List_User from './List_User.jsx';

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
        <DashNavbar />
        <Grid style={{width:'100%'}}>
                <Row>
                  <Col xs={12} sm={3} md={2} lg={2}>   <List_User/> </Col>
                  <Col xs={6} sm={6} md={8} lg={10}> <Paper style={style.paper}>{this.props.children}</Paper> </Col>
                </Row>
              </Grid>
      </div>
    );
  }
}

export default Dashboard;
