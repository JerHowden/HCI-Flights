import React, { Component } from 'react';
import ReactMapGL from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import buildingsData from "./Buildings.geojson"
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
                zoom: 14,
            },

            apiKey: 'pk.eyJ1IjoiZWxpYXNjbTE3IiwiYSI6ImNrMzR4NmJvdzFhOW8zbXBweXUwcHIwdDYifQ.T_3ZZklfpxf5b8wibfI0ew'

        }
    }

    // change lat, long, and zoom on click or search
    // change the color of TTU related buildings on hover
    // display left justified panel on click or search
        //pull data from json file as a profile for each building


componentDidMount(){

        //create map object
        const map = this.reactMap.getMap();
        // console.log('map', map);

        //load geojson data
        const TTU = buildingsData;
        var hoveredStateId = null;

        map.on('load', () => {

            map.addSource("Building Data", {
                "type": "geojson",
                "data": TTU
            })

            //fills for the building polygons
            map.addLayer({
                "id": "building-fills",
                "type": "fill",
                "source": "Building Data",
                "layout": {
                    // "text-field": "title",
                    // "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"]
                },
                "paint": {
                    "fill-color": "#627BC1",
                    "fill-opacity": ["case",
                        ["boolean", ["feature-state", "hover"], false],
                        1,
                        0.2
                    ]
                }
            });
            
            // borders for the building polygons
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

            map.on('mousemove', (e) => {
                console.log(e.lngLat)
            });
        
             map.on("mousemove", "building-fills", function (e) {
                console.log(e)
                if (e.features.length > 0) {
                    if (hoveredStateId) {
                        map.setFeatureState({ source: 'Building Data', id: hoveredStateId }, { hover: false });
                    }
                    hoveredStateId = e.features[0].id;
                    map.setFeatureState({ source: 'Building Data', id: hoveredStateId }, { hover: true });
                }
            });


            map.on("mouseleave", "building-fills", function () {
                if (hoveredStateId) {
                    map.setFeatureState({ source: 'Building Data', id: hoveredStateId }, { hover: false });
                }
                hoveredStateId = null;
            });

        });
        
    }


    render() {
        return (
            <div>
                {/* <input 
                    id='pac-input'
                    className='controls'
                    type='text'
                    placeholder='Search TTU'
                     // Need to figure out how to create an autocomplete feature for the local json data
                /> */}
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