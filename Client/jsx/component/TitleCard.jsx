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
        <Card style={{marginTop:"1%"}}>
        <CardText>
           <Grid>
               <Row around="xs" center="xs">

                 <Col >
                 	 <i className="material-icons" style={{fontSize: '38px'}}>add_shopping_cart</i>
                     <h3>Choose your Repo</h3>
                 </Col>

                 <Col >
                 	<i className="material-icons" style={{fontSize: '38px'}}>description</i>
                   <h3>Choose your Template</h3>
                 </Col>

                 <Col >
                 <i className="material-icons" style={{fontSize: '38px'}}>report</i>
                  <h3>Report</h3>
                 </Col>

               </Row>
          </Grid>
        </CardText>
     </Card>
      </MuiThemeProvider>
    );
	}
}
