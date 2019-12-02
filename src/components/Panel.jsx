import React, { Component, Fragment } from "react"

import { Chip, Avatar } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Sidebar from "react-sidebar"

import './Panel.css'

export default class Panel extends Component{
    constructor(props) {
        super(props);

        // this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);

        this.state = {

        }

    }

    render() {
        return (
            <Sidebar
                rootId="MapSidebarRoot"
                sidebarId="MapSidebar"
                open={this.props.open}
                // onSetOpen={this.onSetSidebarOpen}
                styles={{ 
                    sidebar: { 
                        backgroundColor: "#353535", 
                        color: "#FFF", 
                        // width: window.innerWidth*.5 - 32,
                        width: window.innerWidth*.3,
                        zIndex: 20,
                        overflowX: "hidden"
                    } 
                }}
                pullRight

                sidebar={this.props.data ? 
                    <div id="SidebarData">
                        <img src={this.props.data.image} alt="" width={window.innerWidth*.3}/>
                        <div>
                            <h1>
                                {this.props.data.label}
                                {this.props.data.code ? 
                                    <Chip variant="outlined" label={this.props.data.code} size="small" style={{marginLeft: "8px", color: "#CACACA"}} /> 
                                : ""}
                            </h1>
                            <div>
                                {this.props.data.links.map(link => 
                                    <a href={link.link} key={link.label} title={link.label} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginRight: "8px", marginBottom: "6px"}}>
                                        <Avatar style={{backgroundColor: "#2D2D2D"}}>
                                            <FontAwesomeIcon icon={link.icon} />
                                        </Avatar>
                                    </a>
                                )}
                            </div>
                            <p>{this.props.data.description}</p>
                        </div>
                    </div>
                : ""}
            >
                
            </Sidebar>
        );
    }
}
