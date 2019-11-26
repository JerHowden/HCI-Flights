import React, { Component, Fragment } from 'react';
import ReactMapGL, { Popup, Source, Layer, Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import jsonData from '../data/Buildings.geojson'
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

            data: jsonData,
            hoveredFeature: null,
            clickedFeature: null,
            hoverInfo: null,
            apiKey: 'pk.eyJ1IjoiZWxpYXNjbTE3IiwiYSI6ImNrMzR4NmJvdzFhOW8zbXBweXUwcHIwdDYifQ.T_3ZZklfpxf5b8wibfI0ew',

            styleFill: {
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
                        0.3
                    ]
                }
            },

            styleOutline: {
                "id": "building-borders",
                "type": "line",
                "source": "Building Data",
                "layout": {},
                "paint": {
                    "line-color": "#627BC1",
                    "line-width": 2
                }
            }

        }
    }

    // change lat, long, and zoom on click or search
    // change the color of TTU related buildings on hover
    // display left justified panel on click or search
        //pull data from json file as a profile for each building


componentDidMount(){

        //create map object
        // const map = this.reactMap.getMap();
        // console.log('map', map);

        // var hoveredStateId = null;

        // map.on('load', () => {

            // map.on('click', (e) => {
            //     console.log(e.lngLat)
            // });

            // map.addSource("Building Data", {
            //     "type": "geojson",
            //     "data": this.state.data
            // })

            //fills for the building polygons
            // map.addLayer({
            //     "id": "building-fills",
            //     "type": "fill",
            //     "source": "Building Data",
            //     "layout": {
            //         // "text-field": "title",
            //         // "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"]
            //     },
            //     "paint": {
            //         "fill-color": "#627BC1",
            //         "fill-opacity": ["case",
            //             ["boolean", ["feature-state", "hover"], false],
            //             1,
            //             0.2
            //         ]
            //     }
            // });
            
            // borders for the building polygons
            // map.addLayer({
            //     "id": "building-borders",
            //     "type": "line",
            //     "source": "Building Data",
            //     "layout": {},
            //     "paint": {
            //         "line-color": "#627BC1",
            //         "line-width": 2
            //     }
            // });

            // map.on('click', (e) => {
            //     console.log(e.lngLat)
            // });
        
            //  map.on("mousemove", "building-fills", function (e) {
            //     console.log(e)
            //     if (e.features.length > 0) {
            //         if (hoveredStateId) {
            //             map.setFeatureState({ source: 'Building Data', id: hoveredStateId }, { hover: false });
            //         }
            //         hoveredStateId = e.features[0].id;
            //         map.setFeatureState({ source: 'Building Data', id: hoveredStateId }, { hover: true });
            //     }
            // });


            // map.on("mouseleave", "building-fills", function () {
            //     if (hoveredStateId) {
            //         map.setFeatureState({ source: 'Building Data', id: hoveredStateId }, { hover: false });
            //     }
            //     hoveredStateId = null;
            // });

        // });
        
    }

    _onHover = event => {

        let hoverInfo = null;

        const {
            features,
            srcEvent: { offsetX, offsetY },
        } = event;

        const hoveredFeature = features && features.find(f => f.layer.id === 'building-fills');
        this.setState({ hoveredFeature });

        if(hoveredFeature){
            // console.log(hoveredFeature);
            hoverInfo = event.lngLat;
            this.setState({ hoverInfo });
        }

    };
    _renderPopup() {
        const { hoverInfo, hoveredFeature } = this.state;
        if (hoverInfo && hoveredFeature) {
            return (
                <Popup longitude={Object.values(hoverInfo)[0]} latitude={Object.values(hoverInfo)[1]} closeButton={false}>
                    <div className="building info-window">{hoveredFeature.properties.title}</div>
                    <p>ADD DESCRIPTION OF BUILDINGS HERE</p>
                </Popup>
            );
        }
        return null;
    }


    _onClick = event =>{

        const {
            features,
            srcEvent: { offsetX, offsetY },
        } = event;

        const clickedFeature = features && features.find(f => f.layer.id === 'building-fills');
        this.setState({ clickedFeature });

    }

    _renderSidebar() {
        const { clickedFeature } = this.state

        if(clickedFeature){
            return (
                <Panel title={clickedFeature.properties.title}/>
            );
        }
    }
    

    render() {
        return (
            <Fragment>
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
                    onHover={this._onHover}
                    onClick={this._onClick}
                >
                <Source type="geojson" data={this.state.data}>
                    <Layer {...this.state.styleFill}/>
                    <Layer {...this.state.styleOutline}/>
                </Source>
                {this._renderPopup()}
                {this._renderSidebar()}
                </ReactMapGL>
            </Fragment>
        )
    }
}