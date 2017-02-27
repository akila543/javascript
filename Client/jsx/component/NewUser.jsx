import React from 'react';
import AppBar from 'material-ui/AppBar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Grid,Row,Col} from 'react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';
import TitleCard from './TitleCard.jsx';
export default class User extends React.Component
{
  render()
  {
    return(
    <div>
        <AppBar title="Hello User"/>
        <TitleCard/>
      </div>);
  }
}