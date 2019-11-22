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
    }

    render() {
        return (
            <Sidebar
                sidebar={
                    <Fragment>
                        <b>Title here</b>
                        <h1>Main Content Here</h1>
                        <h3> Other stuff here</h3>
                        <ul>
                            <li>A</li>
                            <li>B</li>
                            <li>C</li>
                            <li>D</li>
                        </ul>
                    </Fragment>
                }
                open={this.state.sidebarOpen}
                onSetOpen={this.onSetSidebarOpen}
                styles={{ sidebar: { background: "white", width: window.innerWidth*.2} }}
            >
                <button onClick={() => this.onSetSidebarOpen(true)}>
                    Open sidebar
                </button>
            </Sidebar>
        );
    }
}
