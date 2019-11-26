import React, { Component, Fragment } from 'react';
import ReactMapGL, { Popup, Source, Layer, Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import jsonData from '../data/Buildings.geojson'
import Panel from './Panel'

const notHighlighted = {
    "id": "building-fills",
    "type": "fill",
    "source": "Building Data",
    "layout": {
        // "text-field": "title",
        // "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"]
    },
    "paint": {
        "fill-color": "#627BC1",
        "fill-opacity": .3,
        // "fill-outline-color": "#627BC1",
    }
}

const highlighted = {
    "id": "building-fills",
    "type": "fill",
    "source": "Building Data",
    "layout": {
        // "text-field": "title",
        // "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"]
    },
    "paint": {
        "fill-color": "#fcba03",
        "fill-opacity": 1,
        // "fill-outline-color": "#fcba03",
    }
}
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

            filter: ['in', 'BUILDING', ''],
            data: jsonData,
            hoveredFeature: null,
            clickedFeature: null,
            hoverInfo: null,
            apiKey: 'pk.eyJ1IjoiZWxpYXNjbTE3IiwiYSI6ImNrMzR4NmJvdzFhOW8zbXBweXUwcHIwdDYifQ.T_3ZZklfpxf5b8wibfI0ew',
            styleFill: notHighlighted,
            highlightedFill: highlighted

        }
    }

 _onHover = event => {

        let hoverInfo = null;
        let buildingName = '';
        const {
            features,
            srcEvent: { offsetX, offsetY },
        } = event;

        const hoveredFeature = features && features.find(f => f.layer.id === 'building-fills');

        this.setState({ hoveredFeature });
        
        // const building = event.features[0]
        if(hoveredFeature){
            // console.log(hoveredFeature);
            console.log(event)
            buildingName = event.features[0].properties.title;
            hoverInfo = event.lngLat;
            this.setState({ 
                hoverInfo,
                filter: ['in', 'title', buildingName]
            });
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
                    interactiveLayerIds={['building-fills']}
                    {...this.state.viewport}
                    onViewportChange={(viewport) => this.setState({ viewport })}
                    onHover={this._onHover}
                    onClick={this._onClick}
                >
                <Source type="geojson" data={this.state.data}>
                    <Layer {...this.state.styleFill}/>
                    <Layer {...this.state.highlightedFill} filter={this.state.filter}/>
                </Source>
                {this._renderPopup()}
                {this._renderSidebar()}
                </ReactMapGL>
            </Fragment>
        )
    }
}