import ReactDOM from 'react-dom';
import AppBar from 'material-ui/AppBar';
import React from 'react';
import Dashboard from '../component/Dashboard.jsx';
import DashNavbar from '../component/DashNavbar.jsx';
import List_Dashboard from '../component/List_Dashboard.jsx';
import Homepage from '../component/Homepage.jsx';
import Login from '../component/Login.jsx';
import {Grid,Row,Col} from 'react-flexbox-grid/lib';
import Paper from 'material-ui/Paper';
const style={
  margin:"25px 10px 0 50px",
};

class App extends React.Component {

  render()
  {
    return (
      <div >

        <Homepage />

      </div>

    );
  }
}

export default App;
