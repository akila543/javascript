import React from 'react';
import AppBar from 'material-ui/AppBar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Grid,Row,Col} from 'react-flexbox-grid';
import {List, ListItem} from 'material-ui/List';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import {GridList, GridTile} from 'material-ui/GridList';
import Paper from 'material-ui/Paper';
import Request from 'superagent';
export default class User extends React.Component {
	 constructor(props) {
    super(props);
    this.state = {
      tilesData:[],expanded: false,card:<Paper style={{width:"100%",height:"100%",backgroundColor:"#EFEBE9"}}>Hellowdijwqidiwqjdoiuhwquoijnlkxm;lkka;okwoijd</Paper>,
    };
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle(event, toggle)  {
    this.setState({expanded: toggle});
  };

  componentWillMount()
  {
     Request.post('/monitorAll').end((err,res)=>{
      if(err || !res.ok)
        console.log(err);
      else
        {
        }
     })
  }
  render () {

    const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  titleStyle: {
    color: 'rgb(0, 188, 212)',
  },
};

    const tilesData = [
  {
    img: this.state.card,
    title: 'Breakfast',
    author: 'jill111',
  },
  {
    img: this.state.card,
    title: 'Tasty burger',
    author: 'pashminu',
  },
  {
    img: this.state.card,
    title: 'Camera',
    author: 'Danson67',
  },
  {
    img: this.state.card,
    title: 'Morning',
    author: 'fancycrave1',
  },
  {
    img: this.state.card,
    title: 'Hats',
    author: 'Hans',
  },
  {
    img: this.state.card,
    title: 'Honey',
    author: 'fancycravel',
  },
  {
    img: this.state.card,
    title: 'Vegetables',
    author: 'jill111',
  },
  {
    img: this.state.card,
    title: 'Water plant',
    author: 'BkrmadtyaKarki',
  },
];
    return (
    	<div>
    	  <Grid>
       		 <Row>
       		 	<Col xs={12} lg={12} sm={12} md={12}>
       		 		<Card expanded={this.state.expanded}>
                  <CardHeader
                    title="Username"
                    subtitle="Total Jobs "
                    avatar="images/ok-128.jpg"
                    actAsExpander={true}/>
               <CardText>
                  <Toggle
                    toggled={this.state.expanded}
                    onToggle={this.handleToggle}
                    labelPosition="right"
                    label="Toggle to show more"/>
              </CardText>
                  <CardTitle title="Card title" subtitle="Card subtitle" expandable={true} />
              <CardText expandable={true}>
                  <GridList style={styles.gridList} cols={2.2}>
                {tilesData.map((tile) => (
                  <GridTile
                    key={tile.title}
                    title={tile.title}
                    titleStyle={styles.titleStyle}
                    titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)">
          {this.state.card}
        </GridTile>
      ))}
    </GridList>
              </CardText>
          </Card>
         		 </Col>
        	</Row>
      	</Grid>
    	 </div>);
  }
}

