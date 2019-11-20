import React, { Component } from 'react';
import MapGL from 'react-map-gl'
// import WebMercatorViewport from 'viewport-mercator-project';
import 'mapbox-gl/dist/mapbox-gl.css';

import Panel from './Panel'


export default class Map extends Component {
    constructor(props) {
        super(props)

        this.state = {

            viewport: {
                width: 800, // figure out how to full screen the map
                height: 800,
                latitude: 33.594,
                longitude: -101.891,
                zoom: 13.5
            },

            apiKey: 'pk.eyJ1IjoiZWxpYXNjbTE3IiwiYSI6ImNrMzR4NmJvdzFhOW8zbXBweXUwcHIwdDYifQ.T_3ZZklfpxf5b8wibfI0ew'

        }
    }

    // add color to the buildings on component will mount lifecycle??
    // change lat, long, and zoom on click or search
    // change the color of TTU related buildings on hover
    // display left justified panel on click or search
        //pull data from json file as a profile for each building


    render() {
        return (
            <div class='map'>
                <input 
                    id='pac-input'
                    className='controls'
                    type='text'
                    placeholder='Search TTU'
                     // Need to figure out how to create an autocomplete feature for the local json data
                />
                <MapGL 
                    width='100%'
                    height='100%'
                    {...this.state.viewport}
                    style={{ width: '100%', height: '100%'}}
                    mapStyle="mapbox://styles/mapbox/dark-v9"
                    mapboxApiAccessToken={this.state.apiKey}
                    // this allows for the movement of the map. Idk if we are gonna implement this just yet
                    // If we do then we need to implement it with certain boundaries so that you can only drag the viewport so far in relation to lat and lng
                    // onViewportChange={(viewport) => this.setState({ viewport })}
                />
                <Panel/>
            </div >
        )
    }
}