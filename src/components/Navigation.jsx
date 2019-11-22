import React, { Component } from 'react';

import { AppBar, Toolbar, Button, Typography } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './Navigation.css'

export default class Navigation extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return(
            <div id="Navigation">
                <AppBar position="static">
                    <Toolbar>
                        <Button>
                            <img width={32} height={37} src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Texas_Tech_Athletics_logo.svg" alt="Logo" />
                            <Typography>
                                Resource Guide
                            </Typography>
                        </Button>
                        <Button>
                            Map
                        </Button>
                        <Button>
                            Calendar
                        </Button>
                        <Button>
                            Resources
                        </Button>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}
