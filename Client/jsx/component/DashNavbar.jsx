import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Request from 'superagent';
import cookie from 'react-cookie';
import {Link, hashHistory} from 'react-router';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import ActionDashboard from 'material-ui/svg-icons/action/dashboard';
import ActionSearch from 'material-ui/svg-icons/action/search';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/Menu';

class DashNavbar extends React.Component {

    constructor() {

        super();

        this.state = {

            open: false

        };

        this.handleLogout = this.handleLogout.bind(this);

        this.handleToggle = this.handleToggle.bind(this);

    }

    handleToggle() {

        this.setState({

            open: !this.state.open

        });
    }

    handleLogout()

    {

        cookie.remove("access_token");
        cookie.remove("type");

    }

    render() {

        return (

            <div>

                <AppBar title="Octopus" onLeftIconButtonTouchTap={this.handleToggle} iconElementRight={< Link to = "/" > <FlatButton label="Logout" onClick={this.handleLogout}/> < /Link>}/>

                <Drawer docked={false} width={250} open={this.state.open} onRequestChange={(open) => this.setState({open})}>
<Menu desktop={true} width={320}>
                    <Link to="/monitor">
  <MenuItem onTouchTap={this.handleToggle} primaryText="MONITORING" leftIcon={<ActionSearch />} style={{textAlign:'left',display: 'inline-block', fontSize: '17px',marginTop: '4px',width:'250'}}/>

                    </Link>

                    <Link to='/workflows'>

                        <MenuItem onTouchTap={this.handleToggle} primaryText="WORKFLOW" leftIcon={<ActionDashboard />} style={{textAlign:'left',display: 'inline-block', fontSize: '17px',marginTop: '4px',width:'250'}}/>
                    </Link>
                    <Link to='/AdminPipeline'>
			              <MenuItem  onTouchTap={this.handleToggle} primaryText="INITIATE" leftIcon={<ActionDashboard />}  style={{textAlign:'left',display: 'inline-block', fontSize: '17px',marginTop: '4px',width:'250' }}/>
                  </Link>



                  </Menu>
                </Drawer>

                {this.props.children}

            </div>

        );
    }

}

export default DashNavbar;
