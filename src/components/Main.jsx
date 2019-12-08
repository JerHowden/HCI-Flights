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
                    </div>
                </Fade>
                <video id="background-video" loop autoPlay>
                    <source src={Video} type="video/mp4" />
                </video>
            </Fragment>
        )
    }
}
