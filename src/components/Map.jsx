import React, { Component } from 'react';
import ReactMapGL, { NavigationControl} from 'react-map-gl'

const navStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: '10px'
};

export default class Map extends Component {
    constructor(props) {
        super(props)

        this.state = {

            viewport: {
                latitude: 37.785164,
                longitude: -100,
                zoom: 2.8,
                bearing: 0,
                pitch: 0,
                width: 500,
                height: 500,
            },

            apiKey: 'pk.eyJ1IjoiZWxpYXNjbTE3IiwiYSI6ImNrMzR4NmJvdzFhOW8zbXBweXUwcHIwdDYifQ.T_3ZZklfpxf5b8wibfI0ew'
        }
    }



    render() {

        const {viewport} = this.state.viewport

        return (
            <div id="Map">
                <ReactMapGL
                {...viewport}
                mapStyle="mapbox://styles/mapbox/dark-v9"
                mapboxApiAccessToken={this.state.apiKey}>
                <div className="nav" style={navStyle}>
                    <NavigationControl/>
                </div>    
                </ReactMapGL>
            </div>
        )
    }
}