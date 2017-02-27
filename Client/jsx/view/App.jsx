import ReactDOM from 'react-dom';
import AppBar from 'material-ui/AppBar';
import React from 'react';
import Dashboard from '../component/Dashboard.jsx';
import DashNavbar from '../component/DashNavbar.jsx';
import NewHomePage from '../component/NewHomePage.jsx';
import User from '../component/NewUser.jsx';
import AdminInitiate from "../component/AdminInitiate.jsx";
import cookie from 'react-cookie';
import Paper from 'material-ui/Paper';

const style={
  margin:"25px 10px 0 50px",
};

class App extends React.Component {

  render()
  {
    if(cookie.load('type')==="user")
    {return (
        <User/>
    );}
    else
    if(cookie.load('type')==="admin")
      {return(
        <div>
        <DashNavbar>
          <User />
        </DashNavbar>

        </div>
      );
    }
    else {
      return(
      <NewHomePage />
      );
    }
  }

}

export default App;
