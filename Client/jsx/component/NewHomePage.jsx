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


				<Row center="xs" style={{background:'#212e44'}}>
				<h1 style={{fontSize:'60',color:'white',fontFamily:'Quantico'}}>Orchestropus</h1>
				</Row>
				<Row center="xs" style={{background:'#212e44'}}>
					<img src="../jsx/images/logo.png" />
				</Row>
				<Row center="xs" style={{background:'#212e44'}} >
				<h1 style={{color:'white',fontFamily:'Acme'}}>BUILD and TEST with Confidence</h1>
				</Row>
				<Row center="xs" style={{background:'#212e44'}} >
				<h1  style={{color:'white',height:'40%',fontFamily:'Acme'}}>Orchestropus unifies issues, code review, CI into a single UI</h1>
				</Row>
				<Row center="xs" style={{background:'#212e44',marginTop:'-7'}}>
				<RaisedButton  label="Login  with  Github"  href={"https://github.com/login/oauth/authorize?client_id=d595532bb5ab99a235f8"} labelStyle={{color:"white"}} buttonStyle={{background:"#2ca542 "}}  onClick={this.handleClick} icon={<i className="material-icons" >account_box
				</i>}/>
				</Row>
                 <Row center="xs" className = "buildrow" >

                   	  <Col xs={12} sm={9} md={3} lg={3} className = "build">
                		<img src="../jsx/images/build.png" />
                	  </Col>

                	  <Col center="xs" className = "AppDesc">
                	  <h3 style={{fontFamily:'Acme'}} className="AppHeading" center="xs">What is Orchestropus?</h3>
                	  <p  style={{fontFamily:'Acme'}} className="AppText"> Orchestropus is a self-contained, open source automation server which
										<br/>can be used to automate all sorts of tasks such as building and testing
										<br/>your software. Easily sync your GitHub projects withOrchestropus and you will
										<br/>be testing your code in no time.!
										</p>
                	  </Col>

                </Row>


                <Row center="xs">
                	<h2 style={{fontFamily:'Acme'}} className="Features">Powerful features, simply designed</h2>
                </Row>


				<Row around="xs" center="xs">
				  <Col >
					<i className="material-icons" style={{fontSize: '48px',color: '#006064'}}>cached</i>
					<h4 style={{fontFamily:'Acme'}}>Task monitoring</h4>
				  <p  style={{fontFamily:'Acme'}} className="FeaturesDesc">Easy Monitoring of your tasks
				  <br/>at each stage of the process.Orchestropus
				  <br/>provides the features to constantly
				  <br/>monitor your jobs that are running.</p>
				  </Col>


				  <Col >
					<i className="material-icons" style={{fontSize: '48px',color: '#006064'}}>equalizer</i>
					<h4 style={{fontFamily:'Acme'}}>Rich report system</h4>
				  <p  style={{fontFamily:'Acme'}} className="FeaturesDesc">Orchestropus provides a stable report
				  <br/> system, that let's the user to know
				  <br/> the reports of their job done by providing
				  <br/> specific details about the job.</p>
				  </Col>


				  <Col >
						<i className="material-icons" style={{fontSize: '48px',color: '#006064'}}>build</i>
						  <h4 style={{fontFamily:'Acme'}}>Build your App</h4>
				  <p  style={{fontFamily:'Acme'}} className="FeaturesDesc">Orchestropus provides the user
				  <br/>the feature of automatically installing all
				  <br/>the dependancies that are required to run
				  <br/>and build the project.
				  </p>
				  </Col>
				</Row>


				<Row around="xs" center="xs">

				  <Col center="xs">
					<i className="material-icons" style={{fontSize: '48px',color: '#006064'}}>star_half</i>
					  <h4 style={{fontFamily:'Acme'}} >Code Quality</h4>
				  <p style={{fontFamily:'Acme'}} className="FeaturesDesc">Allows the user to check the quality
				  <br/>of the code, by providing separate
				  <br/>linting utility for eslint and htmlhint,
				  <br/>thus making the code quality higher.
				  </p>
				  </Col>


				  <Col center="xs">
					<i className="material-icons" style={{fontSize: '48px',color: '#006064'}}>timeline</i>
					<h4 style={{fontFamily:'Acme'}} >Visualize Workflow</h4>
				  <p style={{fontFamily:'Acme'}} className="FeaturesDesc">Provides the additional feature
				  <br/>of being able to visualize the
				  <br/>current workflow of the template
				  <br/>
				 </p>
				  </Col>


				  <Col center="xs">
					<i className="material-icons" style={{fontSize: '48px',color: '#006064'}}>code</i>
					<h4 style={{fontFamily:'Acme'}}>Code Coverage</h4>
				  <p style={{fontFamily:'Acme'}} className="FeaturesDesc">Code coverage is done to
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
							     <h1 style={{fontSize:20,textTransform: 'uppercase',fontFamily:'Quantico'}}>PLATFORM</h1>
							      <ListItem primaryText="Features" style={{color:'steelblue',fontFamily:'Quantico'}} />
							      <ListItem primaryText="Orchestropus Basic" style={{color:'steelblue',fontFamily:'Quantico'}}  />
							      <ListItem primaryText="Orchestropus Pro"  style={{color:'steelblue',fontFamily:'Quantico'}}/>
							    </List>
									</Col>

									<Col>
									  <List >
							      <h1 style={{fontSize:20,textTransform: 'uppercase',fontFamily:'Quantico'}}>COMPANY</h1>
							      <ListItem primaryText="Team" style={{color:'steelblue',fontFamily:'Quantico'}}/>
							      <ListItem primaryText="Customers"  style={{color:'steelblue',fontFamily:'Quantico'}} />
							      <ListItem primaryText="Careers"  style={{color:'steelblue',fontFamily:'Quantico',fontFamily:'Quantico'}}  />
							      <ListItem primaryText="Press" style={{color:'steelblue',fontFamily:'Quantico'}} />
							    </List>
									 </Col>

								 <Col>
							    <List >
							      <h1 style={{fontSize:20,textTransform: 'uppercase',fontFamily:'Quantico',fontFamily:'Quantico',fontFamily:'Quantico',fontFamily:'Quantico',fontFamily:'Quantico'}}>PRICING</h1>
							      <ListItem primaryText="Orchestropus Pricing" style={{color:'steelblue',fontFamily:'Quantico',fontFamily:'Quantico',fontFamily:'Quantico',fontFamily:'Quantico'}}  />
							      <ListItem primaryText="Orchestropus Basic" style={{color:'steelblue',fontFamily:'Quantico',fontFamily:'Quantico',fontFamily:'Quantico'}}  />
							      <ListItem primaryText="Orchestropus Pro" style={{color:'steelblue',fontFamily:'Quantico',fontFamily:'Quantico'}}  />
							      <ListItem primaryText="Contact sales"  style={{color:'steelblue',fontFamily:'Quantico'}} />
							    </List>
									</Col>

									</Row>

									<p>Copyright &copy; Orchestropus.com</p>
									</footer>
							</Grid>
										);
								}
							}
