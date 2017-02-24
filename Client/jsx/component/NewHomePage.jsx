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
import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import {Link,hashHistory} from 'react-router';
import request from 'superagent';
import {Grid, Row, Col} from 'react-flexbox-grid/lib/index';

import Request from 'superagent';


export default class HomePageUpdated extends React.Component
{
	render()
	{
		return(

				<Grid style={{width:'98%'}}>

				<Row center="xs" style={{background:'black'}}>

				<h1 style={{fontSize:'40',color:'white',paddingRight:'980'}}>Orchestropus</h1>
				<img  style={{width:'4%',height:'4%',marginRight:'1300',marginTop:'-55'}}src="../jsx/images/logo.png"/>
				</Row>
				<Row center="xs" style={{background:'black'}}>
					<img src="../jsx/images/giphy.gif" />
				</Row>
				<Row center="xs" style={{background:'black'}} >
				<h1 style={{color:'white'}}>BUILD and TEST with Confidence</h1>
				<h1  style={{color:'white',height:'40%'}}>Octopus unifies issues, code review, CI into a single UI</h1>
				</Row>
				<Row center="xs" style={{background:'black',marginTop:'-2'}}>
				<RaisedButton  label="Login  with  Github"  href={"https://github.com/login/oauth/authorize?client_id=d595532bb5ab99a235f8"} labelStyle={{color:"white"}} buttonStyle={{background:"#FF5722 "}}  onClick={this.handleClick} icon={<i className="material-icons" >account_box
				</i>}/>
				</Row>
                 <Row center="xs" className = "buildrow" >

                   	  <Col xs={12} sm={9} md={3} lg={3} className = "build">
                		<img src="../jsx/images/build.png" />
                	  </Col>

                	  <Col center="xs" className = "AppDesc">
                	  <h3 className="AppHeading" center="xs">What is Octopus?</h3>
                	  <p className="AppText"> Octopus is a self-contained, open source automation server which
										<br/>can be used to automate all sorts of tasks such as building and testing
										<br/>your software. Easily sync your GitHub projects withOctopus and you will
										<br/>be testing your code in no time.!
										</p>
                	  </Col>

                </Row>


                <Row center="xs">
                	<h2 className="Features">Powerful features, simply designed</h2>
                </Row>


				<Row around="xs" center="xs">
				  <Col >
					<i className="material-icons" style={{fontSize: '48px',color: '#006064'}}>cached</i>
					<h4>Task monitoring</h4>
				  <p className="FeaturesDesc">Easy Monitoring of your tasks
				  <br/>at each stage of the process.Octopus
				  <br/>provides the features to constantly
				  <br/>monitor your jobs that are running.</p>
				  </Col>


				  <Col >
					<i className="material-icons" style={{fontSize: '48px',color: '#006064'}}>equalizer</i>
					<h4>Rich report system</h4>
				  <p className="FeaturesDesc">Octopus provides a stable report
				  <br/> system, that let's the user to know
				  <br/> the reports of their job done by providing
				  <br/> specific details about the job.</p>
				  </Col>


				  <Col >
						<i className="material-icons" style={{fontSize: '48px',color: '#006064'}}>build</i>
						  <h4>Build your App</h4>
				  <p className="FeaturesDesc">Octopus provides the user
				  <br/>the feature of automatically installing all
				  <br/>the dependancies that are required to run
				  <br/>and build the project.
				  </p>
				  </Col>
				</Row>


				<Row around="xs" center="xs">

				  <Col center="xs">
					<i className="material-icons" style={{fontSize: '48px',color: '#006064'}}>star_half</i>
					  <h4>Code Quality</h4>
				  <p className="FeaturesDesc">Allows the user to check the quality
				  <br/>of the code, by providing separate
				  <br/>linting utility for eslint and htmlhint,
				  <br/>thus making the code quality higher.
				  </p>
				  </Col>


				  <Col center="xs">
					<i className="material-icons" style={{fontSize: '48px',color: '#006064'}}>timeline</i>
					<h4>Visualize Workflow</h4>
				  <p className="FeaturesDesc">Provides the additional feature
				  <br/>of being able to visualize the
				  <br/>current workflow of the template
				  <br/>
				 </p>
				  </Col>


				  <Col center="xs">
					<i className="material-icons" style={{fontSize: '48px',color: '#006064'}}>code</i>
					<h4>Code Coverage</h4>
				  <p className="FeaturesDesc">Code coverage is done to
				  <br/>describe the degree to which the
				  <br/>code executed. Code coverage with
				  <br/>more percentage describes,has had more
					<br/>of its source code executed.
				   </p>
				  </Col>

				</Row>

							<footer>

							  <Row around="xs">

									<Col >
							    <List >
							     <h1 style={{fontSize:20,textTransform: 'uppercase'}}>PLATFORM</h1>
							      <ListItem primaryText="Features" style={{color:'steelblue'}} />
							      <ListItem primaryText="Octopus Basic" style={{color:'steelblue'}}  />
							      <ListItem primaryText="Octopus Pro"  style={{color:'steelblue'}}/>
							    </List>
									</Col>

									<Col>
									  <List >
							      <h1 style={{fontSize:20,textTransform: 'uppercase'}}>COMPANY</h1>
							      <ListItem primaryText="Team" style={{color:'steelblue'}}/>
							      <ListItem primaryText="Customers"  style={{color:'steelblue'}} />
							      <ListItem primaryText="Careers"  style={{color:'steelblue'}}  />
							      <ListItem primaryText="Press" style={{color:'steelblue'}} />
							    </List>
									 </Col>

								 <Col>
							    <List >
							      <h1 style={{fontSize:20,textTransform: 'uppercase'}}>PRICING</h1>
							      <ListItem primaryText="Octopus Pricing" style={{color:'steelblue'}}  />
							      <ListItem primaryText="Octopus Basic" style={{color:'steelblue'}}  />
							      <ListItem primaryText="Octopus Pro" style={{color:'steelblue'}}  />
							      <ListItem primaryText="Contact sales"  style={{color:'steelblue'}} />
							    </List>
									</Col>

									</Row>

									<p>Copyright &copy; Octopus.com</p>
									</footer>
							</Grid>
										);
								}
							}
