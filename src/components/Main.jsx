import React, { Component, Fragment } from 'react'
import { Fade } from '@material-ui/core'

import './Main.css'
import Video from '../video/HCI-vid.MP4'

export default class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return(
            <Fragment>
                <Fade in={true} timeout={3000} id="MainTitle">
                    <div>
                        <div>TEXAS TECH</div>
                        <div>RESOURCE GUIDE</div>
                        <img className="logo" width={80} height={92.5} src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Texas_Tech_Athletics_logo.svg" alt="Logo" style={{marginTop: '25px'}}/>
                    </div>
                </Fade>
                <video id="background-video" loop autoPlay muted>
                    <source src={Video} type="video/mp4" />
                </video>
            </Fragment>
        )
    }
}
