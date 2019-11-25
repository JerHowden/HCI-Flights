import React, { Component } from 'react';
import MapGL, {Source, Marker, Layer} from 'react-map-gl'
// import WebMercatorViewport from 'viewport-mercator-project';
import 'mapbox-gl/dist/mapbox-gl.css';
import * as buildings from "./Buildings.geojson"

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

    componentWillMount(){
        const map = this.reactMap.getMap();
        
        map.on('load', () => {
            //do shit here with source and layer lmao
            map.addSource("Buildings", {
                "type": "geojson",
                "data": buildings
            })
        })

        map.addLayer({
            "id": "building-fills",
            "type": "fill",
            "source": "building",
            "layout": {},
            "paint": {
                "fill-color": "#627BC1",
                "fill-opacity": ["case",
                    ["boolean", ["feature-state", "hover"], false],
                    1,
                    0.5
                ]
            }
        });

        map.addLayer({
            "id": "state-borders",
            "type": "line",
            "source": "states",
            "layout": {},
            "paint": {
                "line-color": "#627BC1",
                "line-width": 2
            }
        });
    }


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
                    ref={(reactMap) => this.reactMap = reactMap}
                    style={{ width: '100%', height: '100%'}}
                    mapStyle="mapbox://styles/eliascm17/ck3drcdxm13li1cmm1gpbomrv"
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
                />  
                </MapGL>
                {/* <Panel/> */}
            </div >
        )
    }
}