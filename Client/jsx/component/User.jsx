import React from 'react';
import AppBar from 'material-ui/AppBar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Grid,Row,Col} from 'react-flexbox-grid';
import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import cookie from 'react-cookie';
import Request from 'superagent';
export default class User extends React.Component {
    constructor(props)
    {
        super();
        this.state={UserName:'user',repos:['Repo1','Repo2','Repo3','Repo4','Repo5'],repoUrl:'',selectedRepo:''};
        this.handleRepo = this.handleRepo.bind(this);
        this.handleType = this.handleType.bind(this);
        this.handleUrl = this.handleUrl.bind(this);
    }

    handleType(e)
    {
        this.setState({selectedRepo:e.target.value});
        this.setState({repoUrl:e.target.value});
    }
    handleRepo()
    {
        var array = this.state.repos;
        var temp = this.state.repoUrl.split('/');
        array.push(temp[3]+"/"+temp[4]);
        this.setState({repos:array});
    }
    handleUrl(e)
    {
        var temp = "http://github.com/"+e;
        this.setState({selectedRepo:temp})

         Request.get('/userjoblist').set('Accept', 'application/json').send({user:this.state.UserName,repoUrl:temp}).end(function(err, res) {
            if (err || !res.ok)
                alert('Oh no! error');
            else {
                    console.log(res.text);
                 }
             })

    }

    componentDidMount()
    {
        var gitDetails=[];
        var tempRepos=[];
        var uName,aUrl;
        var that=this;
        console.log(cookie.load("repos_url")+"-------");
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
  render () {
    return (
        <div>
          <AppBar title={"Hello "+this.state.UserName}/>
          <div>
          <Grid>
             <Row>
                <Col xs={6}>
                    <TextField value={this.state.selectedRepo} floatingLabelText="Enter your git repo url" onChange={this.handleType}/>
                    <RaisedButton label="Submit" secondary={true} style={{marginLeft:"1%"}} onClick={this.handleRepo}/>
                </Col>
                 <Col xs={6}>
                    <Card>
                        <CardHeader title="Your Repositories"/>
                            <CardText>
                                <List>
                                {this.state.repos.map(text=>
                                
                                    <ListItem key={text}  primaryText={text} onClick={()=>this.handleUrl(text)}/>
                                
                                )}
                                </List>
                            </CardText>
                    </Card>
                 </Col>
            </Row>
        </Grid>
          </div>
         </div>);
  }
}

