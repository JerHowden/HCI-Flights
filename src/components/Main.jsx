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
            <div onMouseMove={() => this.props.fade()} style={{ backgroundColor: "#353535", height: window.innerHeight, position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}>
                <Fade in={this.props.fadeIn} timeout={3000} id="MainTitle">
                    <div className='title'>
                        <div>TEXAS TECH</div>
                        <div>RESOURCE GUIDE</div>
                        <img className="logo" width={80} height={92.5} src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Texas_Tech_Athletics_logo.svg" alt="Logo" style={{marginTop: '35px'}}/>
                    </div>
                </Fade>
                <video id="background-video" loop autoPlay muted>
                    <source src={Video} type="video/mp4" />
                </video>
            </div>
        )
    }
}
