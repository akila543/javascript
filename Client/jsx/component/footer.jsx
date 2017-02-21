import React from 'react';
import {Grid,Row,Col} from 'react-flexbox-grid/lib';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ActionInfo from 'material-ui/svg-icons/action/info';

<footer>
<Grid   style={{width:'90%'}}>
                <Row around="xs">
				  <Col >
    <List >
     <h1 style={{fontSize:20,textTransform: 'uppercase'}}>PLATFORM</h1>
      <ListItem primaryText="Features" style={{color:'steelblue'}} />
      <ListItem primaryText="Octopus Basic" style={{color:'steelblue'}}  />
      <ListItem primaryText="Octopus Pro"  style={{color:'steelblue'}}/>
          </List>			  </Col>
				  <Col>

    <List >
      <h1 style={{fontSize:20,textTransform: 'uppercase'}}>COMPANY</h1>
      <ListItem primaryText="Team" style={{color:'steelblue'}}/>
      <ListItem primaryText="Customers"  style={{color:'steelblue'}} />
      <ListItem primaryText="Careers"  style={{color:'steelblue'}}  />
      <ListItem primaryText="Press" style={{color:'steelblue'}} />
    </List>				  </Col>
				  <Col>

    <List >
<h1 style={{fontSize:20,textTransform: 'uppercase'}}>PRICING</h1>
      <ListItem primaryText="Octopus Pricing" style={{color:'steelblue'}}  />
      <ListItem primaryText="Octopus Basic" style={{color:'steelblue'}}  />
      <ListItem primaryText="Octopus Pro" style={{color:'steelblue'}}  />
      <ListItem primaryText="Contact sales"  style={{color:'steelblue'}} />
    </List>
				  </Col>
<Col>


</Col>
				</Row>
</Grid>
Copyright &copy; Octopus.com</footer>
			</div>);
	}
}
