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
                sidebar={
                    <Fragment>
                        <h1>{this.props.title}</h1>
                    </Fragment>
                }
                open={this.state.sidebarOpen}
                onSetOpen={this.onSetSidebarOpen}
                styles={{ sidebar: { background: "white", width: window.innerWidth*.2} }}
            >
            </Sidebar>
        );
    }
}
