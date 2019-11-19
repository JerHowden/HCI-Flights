import React, { Component } from 'react';
import MapGL from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css';

export default class Map extends Component {
    constructor(props) {
        super(props)

        this.state = {

            apiKey: 'pk.eyJ1IjoiZWxpYXNjbTE3IiwiYSI6ImNrMzR4NmJvdzFhOW8zbXBweXUwcHIwdDYifQ.T_3ZZklfpxf5b8wibfI0ew'

        }
    }

    render() {
        return (
            <div class='map'>
                <MapGL 
                    style={{ width: '100%', height: '90%', overflow: 'visible'}}
                    mapStyle="mapbox://styles/mapbox/dark-v9"
                    mapboxApiAccessToken={this.state.apiKey}
                    latitude={37.78}
                    longitude={-122.41}
                    zoom={11}
                />
            </div >
        )
    }
}