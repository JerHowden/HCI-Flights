import React, { Component } from 'react';

import { AppBar, Toolbar, Button, Grid, Fade } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink, Link, withRouter } from 'react-router-dom'

import './Navigation.css'

class Navigation extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    componentWillReceiveProps(nextProps) {
        console.log("Props:", nextProps)
    }

    render() {
        return(
            <Fade in={this.props.fadeIn} timeout={3000}>
                <div 
                    id="Navigation"
                    style={this.props.location.pathname === "/" ? 
                        { backgroundColor: "transparent" }
                        :
                        { backgroundColor: "#353535" }
                    }    
                >
                    <AppBar position="static" style={{boxShadow: 'none'}}>
                        <Toolbar>
                            <Grid container justify="space-between">
                                <Grid item>
                                    <Link to="/">
                                        <Button className="navButton" >
                                            <img className="logo" width={32} height={37} src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Texas_Tech_Athletics_logo.svg" alt="Logo" />
                                                Resource Guide
                                        </Button>
                                    </Link>
                                </Grid>
                                <Grid item id="NavigationRight">
                                    <NavLink to="/map" activeClassName="selected">
                                        <Button className="navButton" >
                                            Map
                                        </Button>
                                    </NavLink>
                                    <NavLink to="/calendar" activeClassName="selected">
                                        <Button className="navButton" >
                                            Calendar
                                        </Button>
                                    </NavLink>
                                    <NavLink to="/resources" activeClassName="selected">
                                        <Button className="navButton" >
                                            Resources
                                        </Button>
                                    </NavLink>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                </div>
            </Fade>
        )
    }
}

export default withRouter(Navigation)
