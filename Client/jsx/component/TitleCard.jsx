import React from 'react';
import {Card, CardText} from 'material-ui/Card';
import {Grid,Row,Col} from 'react-flexbox-grid';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';

export default class TitleCard extends React.Component
{
	render()
	{
	return (

      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <Card style={{borderRadius: "25px",marginTop:"1%"}}>
        <CardText>
           <Grid>
               <Row around="xs" center="xs">

                 <Col >
                 	 <i className="material-icons" style={{fontSize: '48px'}}>add_shopping_cart</i>
                     <h1>Choose your Repo</h1>
                 </Col>
                
                 <Col >
                 	<i className="material-icons" style={{fontSize: '48px'}}>description</i>
                   <h1>Choose your Template</h1>
                 </Col>
                 
                 <Col >
                 <i className="material-icons" style={{fontSize: '48px'}}>report</i>
                  <h1>Report</h1>
                 </Col>

               </Row>
          </Grid>
        </CardText>
     </Card>
      </MuiThemeProvider>
    );
	}
}