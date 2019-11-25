import React, { Component } from 'react';
import ReactMapGL, {Source, Marker, Layer} from 'react-map-gl'
// import WebMercatorViewport from 'viewport-mercator-project';
import 'mapbox-gl/dist/mapbox-gl.css';
import buildings from "./Buildings.geojson"

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


componentDidMount(){

        const map = this.reactMap.getMap();
        console.log('map', map);
        //load geojson
        const TTU = buildings
        
        map.on('load', () => {
            //do shit here with source and layer lmao
            map.addSource("Building Data", {
                "type": "geojson",
                "data": TTU
            })

            //fills for the building polygons
            map.addLayer({
                "id": "buildings-fills",
                "type": "fill",
                "source": "Building Data",
                "layout": {
                    // "text-field": "title",
                    // "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"]
                },
                "paint": {
                    "fill-color": "#c6eb34",
                    "fill-opacity": 0.8
                    //["cfase",
                    //     ["boolean", ["feature-state", "hover"], false],
                    //     1,
                    //     0.5
                    //]
                }
            });
            
            //borders for the building polygons
            map.addLayer({
                "id": "building-borders",
                "type": "line",
                "source": "Building Data",
                "layout": {},
                "paint": {
                    "line-color": "#627BC1",
                    "line-width": 2
                }
            });

        });

    

        var hoveredStateId = null;

        //on hover fill in the polygon
        map.on("mousemove", "building-fills", function (e) {
            if (e.features.length > 0) {
                if (hoveredStateId) {
                    map.setFeatureState({ source: 'buildings', id: hoveredStateId }, { hover: false });
                }
                hoveredStateId = e.features[0];
                map.setFeatureState({ source: 'buildings', id: hoveredStateId }, { hover: true });
            }
        });

        // //on mouse leave, put the polygon back to its original state
        map.on("mouseleave", "building-fills", function () {
            if (hoveredStateId) {
                map.setFeatureState({ source: 'buildings', id: hoveredStateId }, { hover: false });
            }
            hoveredStateId = null;
        });
        
        // let viewport = {
        //     width: window.innerWidth,
        //     height: window.innerHeight,
        //     latitude: 33.594,
        //     longitude: -101.891,
        //     zoom: 14
        // }
        // this.setState({ viewport }, () => console.log("Viewport", viewport, this.state))

    }


    render() {
        return (
            <div>
                <input 
                    id='pac-input'
                    className='controls'
                    type='text'
                    placeholder='Search TTU'
                     // Need to figure out how to create an autocomplete feature for the local json data
                />
                <ReactMapGL 
                    ref={(reactMap) => this.reactMap = reactMap}
                    style={{ width: '100%', height: '100%'}}
                    mapStyle="mapbox://styles/mapbox/dark-v10"
                    mapboxApiAccessToken={this.state.apiKey}
                    {...this.state.viewport}
                    onViewportChange={(viewport) => this.setState({ viewport })}
                >
                </ReactMapGL>
                {/* <Panel/> */}
            </div >
        )
    }
}