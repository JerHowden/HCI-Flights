import React, { Component, Fragment } from 'react'

import ReactMapGL, { Popup, Source, Layer, Marker } from 'react-map-gl'
import Select from 'react-select'

import 'mapbox-gl/dist/mapbox-gl.css'
import jsonData from '../data/Buildings.geojson'
import locations from '../data/locations.json'
import Panel from './Panel'
import './Map.css'

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
				height: window.innerHeight - 64,
				latitude: 33.585509,
				longitude: -101.882083,
				zoom: 14,
			},

			filter: ['in', 'BUILDING', ''],
			data: jsonData,
			hoveredFeature: null,
			activeFeature: null,
			hoverInfo: null,
			apiKey: 'pk.eyJ1IjoiZWxpYXNjbTE3IiwiYSI6ImNrMzR4NmJvdzFhOW8zbXBweXUwcHIwdDYifQ.T_3ZZklfpxf5b8wibfI0ew',
			styleFill: notHighlighted,
			highlightedFill: highlighted,

			selectOption: {},
			locations: [],

		}
	}

	componentDidMount() {

		// Load Locations json into state
		let locs = [];
		for(let i in locations) {
			locations[i].value = i
			locs.push(locations[i])
		}
		console.log(locations, locs, this.props)
		this.setState({ locations: locs }, () => console.log("Locations:", this.state.locations))

		// Check if search query parameter matches a building
		if(this.props.match.params.search && locs.some(loc => loc.value.toLowerCase() === this.props.match.params.search.toLowerCase())) {
			let activeFeature;
			// We want to "click" wherever this building is
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


	_onClick = event => {

		const {
			features,
			srcEvent: { offsetX, offsetY },
		} = event;

		const activeFeature = features && features.find(f => f.layer.id === 'building-fills');
		this.setState({ activeFeature });

	}

	_renderSidebar() {
		const { activeFeature } = this.state

		if(activeFeature){
			return (
				<Panel title={activeFeature.properties.title}/>
			);
		}
	}
	

	render() {
		return (
			<Fragment>
				<Select
					id="MapSelect"
					options={this.state.locations}
					defaultInputValue={this.props.match.params.search || ""}
					defaultMenuIsOpen={this.props.match.params.search}
					filterOption={(option, searchText) => {
						console.log(option)
						if( option.label.toLowerCase().includes(searchText.toLowerCase()) ||
							option.value.toLowerCase().includes(searchText.toLowerCase()) ||
							option.data.tags.some(tag => tag.includes(searchText.toLowerCase())) ) 
							return true 
						else 
							return false
					}}
				/>
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