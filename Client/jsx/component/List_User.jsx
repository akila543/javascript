import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';

const style = {
  margin:'30px 0 0 20px',
  width:'100%',

  };
class List_User extends React.Component{

  render(){
  return(
  <div >
        <List style={style}>
          <Link to="/monitor">
            <ListItem primaryText="Monitoring" leftIcon={<ContentInbox />} />
          </Link>
          <Link to="/pipeline">
            <ListItem primaryText="Initiate" leftIcon={<ContentInbox />} />
          </Link>
        </List>
    </div>
  );



}
}

export default List_User;
