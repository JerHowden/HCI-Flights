import React, { Component, Fragment } from "react";
import Sidebar from "react-sidebar";
import './Panel.css'

export default class Panel extends Component{
    constructor(props) {
        super(props);

        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);

        this.state = {
            sidebarOpen: true
        };
    }

    onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: open });
        console.log(this.state.title)
    }

    render() {
        return (
            <Sidebar
                rootId="MapSidebarRoot"
                sidebarId="MapSidebar"
                sidebar={
                    <Fragment>
                        <h1>{this.props.title}</h1>
                    </Fragment>
                }
                open={this.state.sidebarOpen}
                onSetOpen={this.onSetSidebarOpen}
                styles={{ 
                    sidebar: { 
                        backgroundColor: "#353535", 
                        color: "#FFF", 
                        width: window.innerWidth*.5 - 32,
                        zIndex: 20
                    } 
                }}
                pullRight
            >
                children
            </Sidebar>
        );
    }
}
