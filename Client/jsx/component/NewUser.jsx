import React from 'react';
import AppBar from 'material-ui/AppBar';
import TitleCardRepo from './TitleCardRepo.jsx';
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
  {var box=null;
    if(cookie.load('type')=='user')
    box=<AppBar title={"Hello "+cookie.load("user")} iconElementRight={< Link to = "/" > <FlatButton label="Logout" labelStyle={{color:"white"}} onClick={this.handleLogout}/> < /Link>}/>
    return(
    <div>
                {box}
                <TitleCardRepo />
                <SelectRepo/>

      </div>);
  }
}
