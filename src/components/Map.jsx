import React, { Component } from 'react';
import MapGL, {Source, Layer} from 'react-map-gl'
// import WebMercatorViewport from 'viewport-mercator-project';
import 'mapbox-gl/dist/mapbox-gl.css';

import Panel from './Panel'

export default class Map extends Component {
    constructor(props) {
        super(props)

        this.state = {

            viewport: {
                width: window.innerWidth, 
                height: window.innerHeight,
                latitude: 33.594,
                longitude: -101.891,
                zoom: 14
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

        // const onHover = event => {
        //     if (event.features.length > 0) {
        //         const hoveredStateId = event.features[0].id;
        //         if (hoveredStateId !== state.hoveredStateId) {
        //             setState({ hoveredStateId });
        //         }
        //     }
        // };

        // const onLeave = () => {
        //     if (state.hoveredStateId) {
        //         setState({ hoveredStateId: null });
        //     }
        // };

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
                    style={{ width: '100%', height: '100%'}}
                    mapStyle="mapbox://styles/mapbox/dark-v9"
                    mapboxApiAccessToken={this.state.apiKey}
                    {...this.state.viewport}
                    onViewportChange={(viewport) => this.setState({ viewport })}
                >
                <Source id='buildings' type='vector' url='mapbox://mapbox.mapbox-streets-v8'/>
                <Layer
                    id='buildings'
                    type='fill'
                    source='buildings'
                    source-layer='building'
                    paint= {{
                        "fill-color": "#cccccc",
                        "fill-outline-color": "#f52424"
                    }} 
                    // onHover={onHover}
                    // onLeave={onLeave}
                />  
                </MapGL>
                {/* <Panel/> */}
            </div >
        )
    }
}