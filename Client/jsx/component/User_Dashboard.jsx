import React from 'react';
import ReactDOM from 'react-dom';
import {Grid,Row,Col} from 'react-flexbox-grid/lib';
import User from './User.jsx';
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
          <User/>
      </div>
    );
  }
}

export default Dashboard;
