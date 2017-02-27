import React from 'react';
import AppBar from 'material-ui/AppBar';
import TitleCard from './TitleCard.jsx';
import FlatButton from 'material-ui/FlatButton';
import cookie from 'react-cookie';
import SelectRepo from './selectRepo.jsx';
import {Link,hashHistory} from 'react-router';
export default class User extends React.Component
{
  constructor(props)
  {
    super(props);


    this.handleLogout = this.handleLogout.bind(this);
  }
      handleLogout()
      {
          cookie.remove("access_token");
          cookie.remove("type");
      }


  render()
  {

    return(
    <div>
                <AppBar title={"Hello "+cookie.load("user")} iconElementRight={< Link to = "/" > <FlatButton label="Logout" labelStyle={{color:"white"}} onClick={this.handleLogout}/> < /Link>}/>
                <TitleCard/>
                <SelectRepo/>

      </div>);
  }
}
