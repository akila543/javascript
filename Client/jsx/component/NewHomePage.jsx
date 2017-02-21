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
import UserLogin from '../component/Login.jsx';

export default class HomePageUpdated extends React.Component
{
	render()
	{
		return(
			<div>
				<Grid style={{width:'98%'}}>
                <Row className="hero">

                  <h1 className="AppTitle">Octopus</h1>
									<Col xs={12} sm={12} md={12} lg={12}>
                  <img src="../jsx/images/hand.jpg"/>
									</Col>
                   <h1 className="heroPhrase">BUILD and TEST with Confidence</h1>
                   <h1 className="heroPhrase2">Octopus unifies issues, code review, CI into a single UI</h1>
                   <center><UserLogin/></center>
                 </Row>
                 <Row center="xs">

                   	  <Col className="build" center="xs">
                		<img src="../jsx/images/build.png" />
                	  </Col>
                	  <Col className="AppDesc" center="xs">
                	  <h3 className="AppHeading" center="xs">What is Octopus?</h3>
                	  <p className="AppText"> Octopus is a self-contained, open source automation server which can be used to automate
										<br/>all sorts of tasks such as building and testing your software. Easily sync your GitHub projects with
										<br/>Octopus and you will be testing your code in no time.!
										</p>
                	  </Col>
                </Row>
                <Row center="xs">
                	<h2 className="Features">Powerful features, simply designed</h2>
                </Row>
                <Row around="xs" className="iconRow">
				  <Col >
				  <i className="material-icons" style={{fontSize: '48px',color: '#006064'}}>cached</i>
				  </Col>
				  <Col  >
				  <i className="material-icons" style={{fontSize: '48px',color: '#006064'}}>equalizer</i>
				  </Col>
				  <Col >
				  <i className="material-icons" style={{fontSize: '48px',color: '#006064'}}>build</i>
				  </Col>
				</Row>

                <Row around="xs" >
				  <Col>
				  <h4>Task monitoring</h4>
				  </Col>
				  <Col>
				  <h4>Rich report system</h4>
				  </Col>
				  <Col>
				  <h4>Build your App</h4>
				  </Col>
				</Row>

				<Row around="xs" center="xs">
				  <Col >
				  <p className="FeaturesDesc">Easy Monitoring of your tasks
				  <br/>at each stage of the process.Octopus
				  <br/>provides the features to constantly
				  <br/>monitor your jobs that are running.</p>
				  </Col>

				  <Col >
				  <p className="FeaturesDesc">Octopus provides a stable report
				  <br/> system, that let's the user to know
				  <br/> the reports of their job done by providing
				  <br/> specific details about the job.</p>
				  </Col>

				  <Col >
				  <p className="FeaturesDesc">Octopus provides the user
				  <br/>the feature of automatically installing all the
				  <br/>dependancies that are required to run and
				  <br/>build the project.
				  </p>
				  </Col>
				</Row>


				<Row around="xs" className="iconRow">
				  <Col >
				  <i className="material-icons" style={{fontSize: '48px',color: '#006064'}}>star_half</i>
				  </Col>
				  <Col  >
				  <i className="material-icons" style={{fontSize: '48px',color: '#006064'}}>timeline</i>
				  </Col>
				  <Col >
				  <i className="material-icons" style={{fontSize: '48px',color: '#006064'}}>code</i>
				  </Col>
				</Row>

                <Row around="xs" >
				  <Col>
				  <h4>Code Quality</h4>
				  </Col>
				  <Col>
				  <h4>Visualize Workflow</h4>
				  </Col>
				  <Col>
				  <h4>Code Coverage</h4>
				  </Col>
				</Row>

				<Row around="xs" center="xs">
				  <Col center="xs">
				  <p className="FeaturesDesc">Allows the user to check the quality
				  <br/>of the code, by providing separate
				  <br/>linting utility for eslint and htmlhint,
				  <br/>thus making the code quality higher.
				  </p>
				  </Col>
				  <Col center="xs">
				  <p className="FeaturesDesc">Provides the additional feature
				  <br/>of being able to visualize the
				  <br/>current workflow of the template
				  <br/>
				 </p>
				  </Col>

				  <Col center="xs">
				  <p className="FeaturesDesc">Code coverage is done to
				  <br/>describe the degree to which the
				  <br/>code executed. Code coverage with
				  <br/>more percentage describes,has had more
					<br/>of its source code executed.
				   </p>
				  </Col>
				</Row>
              </Grid>
							<footer>
							<Grid   style={{width:'100%'}}>
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

											</Row>
							</Grid>
							Copyright &copy; Octopus.com</footer>
										</div>);
								}
							}
