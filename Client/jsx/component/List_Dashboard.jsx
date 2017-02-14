import React from 'react';
import Badge from 'material-ui/Badge';
import AppBar from 'material-ui/AppBar';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ActionInfo from 'material-ui/svg-icons/action/info';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';
import {Link} from 'react-router';

const style = {
  margin:'30px 0 0 20px',
  width:'100%',

  };

class List_Dashboard extends React.Component{
  constructor(props){
    super(props);
    this.state = {open: false};
    this.handleToggle = this.handleToggle.bind(this);
    this.handleNestedListToggle = this.handleNestedListToggle.bind(this);
  }

  handleToggle(){
    this.setState({
      open: !this.state.open,
    });
  };

  handleNestedListToggle(item){
    this.setState({
      open: item.state.open,
    });
  };


render(){
return(
<div >
      <List style={style}>

        <Link to="/monitor">
          <ListItem primaryText="Monitoring" leftIcon={<ContentInbox />} />
          </Link>
    <ListItem primaryText="Workflow" leftIcon={<ActionGrade />} nestedItems={[
        <Link to="/add">
                  <ListItem
                  key={1}
                  primaryText="ADD"

                />
            </Link>,
            <Link to="/workflowlist">
                <ListItem
                  key={2}
                  primaryText="EDIT/DELETE"
                />
              </Link>,
            ]}>

        </ListItem>

        <ListItem primaryText="Admin Setting" leftIcon={<ContentSend />} />
      </List>

</div>
);}
}
export default List_Dashboard;
