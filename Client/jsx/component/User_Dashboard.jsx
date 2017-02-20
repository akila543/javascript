import React from 'react';
import ReactDOM from 'react-dom';
import {Grid,Row,Col} from 'react-flexbox-grid/lib';
import DashNavbar_user from './DashNavbar_user.jsx';
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

class Dashboard_user extends React.Component {
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
                  <Col xs={12} sm={12} md={12} lg={12}>   <DashNavbar_user /> {this.props.children} </Col>

                </Row>
              </Grid>
      </div>
    );
  }
}

export default Dashboard_user;
