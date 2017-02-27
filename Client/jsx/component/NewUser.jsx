import React from 'react';
import AppBar from 'material-ui/AppBar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Grid,Row,Col} from 'react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';
import TitleCard from './TitleCard.jsx';
import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
//import Request from 'superagent';

export default class User extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state={open:false,githubUrl:'',repos:['repo1','repo7','repo6','repo5','repo4','repo3','repo2']};
    this.handleUrl = this.handleUrl.bind(this);
    this.handleText = this.handleText.bind(this);
    this.handleYes = this.handleYes.bind(this);
  }

      componentWillMount()
    {
        // Request.get(cookie.load("repos_url")).set('Accept', 'application/json').end(function(err, res) {
        //     if (err || !res.ok)
        //         alert('Oh no! error');
        //     else {
        //         gitDetails = res.body;
        //         gitDetails.map((item) => {
        //             tempRepos.push(item.full_name);
        //             uName = item.owner.login;
        //             aUrl = item.owner.avatar_url;
        //         })
        //         that.setState({repos: tempRepos});
        //         that.setState({UserName: uName});
        //     }
        // })
    
    }

  handleUrl(url)
  {
    console.log(url);
    this.setState({open:true})
    var temp="http://github.com/"+url;
    this.setState({githubUrl:temp});
  }

  handleYes()
  {
    this.setState({open:false});
   //  Request.post('/api/pet').send({ name: 'Manny', species: 'cat' }).set('Accept', 'application/json')
   // .end(function(err, res){
   //   if (err || !res.ok) {
   //     alert('Oh no! error');
   //   } else {
   //     alert('yay got ' + JSON.stringify(res.body));
   //   }
   // });
  }

  handleText(e)
  {
    console.log(e.target.value);
    this.setState({githubUrl:e.target.value});
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
        <AppBar title="Hello User"/>
        <TitleCard/>
        <Grid>
          <Row>
            <Col xs={3} sm={3} md={3} lg={3}>
              <Card style={{borderRadius: "25px",marginTop:"6%"}}>
                <CardHeader title="" style={{backgroundColor: "#BDBDBD"}}/>
                <CardText>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                    Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                    Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                </CardText>
              </Card>
            </Col>
            <Col xs={9} sm={9} md={9} lg={9}>
              <Card style={{borderRadius: "25px",marginTop:"2%",backgroundColor:"#F5F5F5"}}>
                <CardText>
                        <TextField value={this.state.githubUrl} floatingLabelText="Type a repo Url" style={{width:"80%"}} onChange={this.handleText}/>
                        <RaisedButton label="Submit" primary={true} style={{marginLeft:"1%"}}/>
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
      </div>);
  }
}
