import React from 'react';
import AppBar from 'material-ui/AppBar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Grid,Row,Col} from 'react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';
import TitleCard from './TitleCard.jsx';
export default class User extends React.Component
{

  constructor(props)
  {
  	super(props);
  	this.state={repos:[],UserName:''};
  }

  componentWillMount()
      {
          var gitDetails=[];
          var tempRepos=[];
          var uName,aUrl;
          var that=this;
          Request.get(cookie.load("repos_url")).set('Accept', 'application/json').end(function(err, res) {
              if (err || !res.ok)
                  alert('Oh no! error');
              else {
                      gitDetails=res.body;
                      gitDetails.map((item)=>{
                      tempRepos.push(item.full_name);
                      uName=item.owner.login;
                      aUrl=item.owner.avatar_url;
                      })
                      that.setState({repos:tempRepos});
                      that.setState({UserName:uName});
                   }
               })

      }

  render()
  {
    return(
    <div>
        <AppBar title={"Hello "+this.state.UserName} iconElementRight={< Link to = "/" > <FlatButton label="Logout" labelStyle={{color:"white"}} onClick={this.handleLogout}/> < /Link>}/>
        <TitleCard/>
        <Grid>
        	<Row>
        		<Col xs={3} sm={3} md={3} lg={3}>
        		</Col>
        	</Row>
        </Grid>
      </div>);
  }
}