import ReactDOM from 'react-dom';
import AppBar from 'material-ui/AppBar';
import React from 'react';
import Dashboard from '../component/Dashboard.jsx';
import DashNavbar from '../component/DashNavbar.jsx';
import List_Dashboard from '../component/List_Dashboard.jsx';
import Homepage from '../component/Homepage.jsx';
import User_Dashboard from '../component/User_Dashboard.jsx';

import cookie from 'react-cookie';
import {Grid,Row,Col} from 'react-flexbox-grid/lib';
import Paper from 'material-ui/Paper';

const style={
  margin:"25px 10px 0 50px",
};

class App extends React.Component {

  render()
  {
    if(cookie.load('type')==="user")
    {return (
      
      <div >
        <User_Dashboard />
      </div>
    );}
    else
    if(cookie.load('type')==="admin")
      {return(
        <div>
          <Dashboard />
        </div>
      );
    }
    else {
      return(
      <Homepage />
      );
    }
  }

}

export default App;
