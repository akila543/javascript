import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Grid,Row,Col} from 'react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Request from 'superagent';
import {Link,hashHistory} from 'react-router';
import cookie from 'react-cookie';
import Subheader from 'material-ui/Subheader';


export default class SelectRepo extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state={open:false,githubUrl:'',githubName:'',repos:[]};
		this.handleUrl = this.handleUrl.bind(this);
	    this.handleText = this.handleText.bind(this);
    	this.handleYes = this.handleYes.bind(this);
			this.handleSubmit = this.handleSubmit.bind(this);
	}
	  componentWillMount()
    {
			var tempRepos=[];
			var uName;
			var aUrl;
			var that = this;
        Request.get(cookie.load("repos_url")).set('Accept', 'application/json').end(function(err, res) {
            if (err || !res.ok)
                alert('Oh no! error');
            else {
							console.log(res.body);
                var gitDetails = res.body;
								console.log(gitDetails);
                gitDetails.map((item) => {
                    tempRepos.push(item.full_name);
                    uName = item.owner.login;
                    aUrl = item.owner.avatar_url;
                })
                that.setState({repos: tempRepos});
                that.setState({UserName: uName});

            }
        })

    }
    handleUrl(url)
  {
    this.setState({githubName:url});
    this.setState({open:true})
    var temp="http://github.com/"+url;
    this.setState({githubUrl:temp});
  }
  handleText(e)
  {
    console.log(e.target.value);
    this.setState({githubUrl:e.target.value});
  }
handleSubmit()
{
	var temp=this.state.githubUrl.split('/');
	var name = temp[3]+'/'+temp[4];
	console.log(name);
	this.setState({githubName:name});
}
  handleYes()
  {
    this.setState({open:false});
		var that = this;
     Request.post('https://api.github.com/repos/' +that.state.githubName+'/hooks?access_token=' +cookie.load('access_token')).send({
                        "name": "web",
                        "active": true,
                        "events": [
                            "push", "pull_request"
                        ],
                        "config": {
                            "url": "http://7cd4b107.ngrok.io/hooks/"+that.state.githubName.split('/')[1],
                            "content_type": "json"
                        }
                    }).set('Accept', 'application/json').end(function(err, res) {
                        if (err || !res.ok) {
                            console.log(err);
                            //res.send('Error in authentication.');
                        } else {
                        console.log('hook added', res);

                          }
                    });

  }
	render()
	{
		const actions = [
      <FlatButton
        label="No"
        primary={true}
        onTouchTap={()=>{this.setState({open:!open})}}
      />,
      <FlatButton
        label="yes"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleYes}
      />,
    ];
		return(
			<div>
			<Grid>
          <Row>
                <Col xs={12} sm={12} md={3} lg={3}>
              <Card style={{borderRadius: "2px",marginTop:"6%"}}>
                <CardText>
                <List style={{}} >
                <Subheader>User Board</Subheader>
                <ListItem primaryText="New Project"  />
                <ListItem primaryText="Build History"  />
                </List>
                </CardText>
              </Card>
            </Col>

            <Col xs={9} sm={9} md={9} lg={9}>
              <Card style={{marginTop:"2%",backgroundColor:"#F5F5F5"}}>
                <CardText>
                        <TextField value={this.state.githubUrl} floatingLabelText="Type a repo Url" style={{width:"80%"}} onChange={this.handleText}/>
												<Link to={"/chooseworkflow/"+this.state.githubName}>
                        <RaisedButton label="Submit" primary={true} style={{marginLeft:"1%"}} onClick={this.handleSubmit}/>
												</Link>
                        <center><h1>OR Choose your repo below</h1></center>
                        <List>
                          {this.state.repos.map(text => <ListItem key={text} primaryText={text} style={{textAlign:"center"}} onClick={() => this.handleUrl(text)}/>)}
                        </List>
                </CardText>
              </Card>

            </Col>

          </Row>
        </Grid>
         <Dialog
          title="Do you wish to integrate your repo with github-webhooks??"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}>
        </Dialog>
			</div>
			);
	}
}
