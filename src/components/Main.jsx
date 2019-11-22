import React, { Component } from 'react'

import { Fade } from '@material-ui/core'

import './Main.css'

export default class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return(
            <Fade in={true} timeout={3000} id="MainTitle">
                <div>
                    <div>TEXAS TECH</div>
                    <div>RESOURCE GUIDE</div>
                </div>
            </Fade>
        )
    }
}
