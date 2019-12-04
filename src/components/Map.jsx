import React, { Component, Fragment } from 'react'

import { Link, Redirect, withRouter } from 'react-router-dom'
import ReactMapGL, { Popup, Source, Layer, Marker, FlyToInterpolator } from 'react-map-gl'
import Select from 'react-select'
import { Chip } from '@material-ui/core'
import polylabel from '@mapbox/polylabel'

import 'mapbox-gl/dist/mapbox-gl.css'
import buildings from '../data/Buildings.json'
import locations from '../data/locations.json'
import Panel from './Panel'
import './Map.css'

const fill = {
	"id": "building-fills",
	"type": "fill",
	"source": "buildings",
	"layout": {},
	"paint": {
		"fill-color": "#627BC1",
		"fill-opacity": ["case",
			["boolean", ["feature-state", "hover"], false],
			1,
			0.3
		]
	}
}

const outline = {
	"id": "building-outline",
	"type": "line",
	"source": "buildings",
	"layout": {},
	"paint": {
		"line-color": "#627BC1",
		"line-width": 2
	}
}
var map = null;

class Map extends Component {
	constructor(props) {
		super(props)

		this.flyToFeature = this.flyToFeature.bind(this)
		this.flyToDefault = this.flyToDefault.bind(this)

		this.state = {

			viewport: {
				width: window.innerWidth, 
				height: window.innerHeight - 64,
				latitude: 33.585509,
				longitude: -101.882083,
				zoom: 14.5,
			},

			apiKey: 'pk.eyJ1IjoiZWxpYXNjbTE3IiwiYSI6ImNrMzR4NmJvdzFhOW8zbXBweXUwcHIwdDYifQ.T_3ZZklfpxf5b8wibfI0ew',
			styleFill: fill,
			styleOutline: outline,

			hoveredFeature: null,
			hoverInfo: null,
			activeFeature: locations[this.props.match.params.location],
			sidebarOpen: !!locations[this.props.match.params.location],

			locations: [],

			hoveredBuildingid: null

		}
	}

	componentDidMount() {

		const { hoveredBuildingid } = this.state

		console.log("Building in url:", !!locations[this.props.match.params.location])
		if(!!locations[this.props.match.params.location])
			this.flyToFeature()

		// Load Locations json into state
		let locs = [];
		for(let i in locations) {
			locations[i].value = i
			locs.push(locations[i])
		}
		this.setState({ locations: locs })

		map = this.reactMap.getMap();

		map.on('load', () => {
			map.addSource('buildings', {
				'type': 'geojson',
				'data': buildings
			})

			map.addLayer({
				"id": 'building-fills',
				'type': 'fill',
				'source': 'buildings',
				'layout': {},
				"paint": {
					"fill-color": "#627BC1",
					"fill-opacity": ["case",
						["boolean", ["feature-state", "hover"], false],
						1,
						0.5
					]
				}
			})

			map.addLayer({
				"id": 'building-outline',
				'type': 'line',
				'source': 'buildings',
				'layout': {},
				"paint": {
					"line-color": "#627BC1",
					"line-width": 2
				}
			})

			map.on("mouseleave", "building-fills", function () {
				if (hoveredBuildingid) {
					map.setFeatureState({ source: 'buildings', id: hoveredBuildingid }, { hover: false });
				}
				hoveredBuildingid = null;
				this.setState({hoveredBuildingid: null})
			});

		})

	}

	componentWillReceiveProps(nextProps) {
		// console.log("CWRP:", nextProps, this.props)
		if(nextProps.match.params.location !== this.props.match.params.location) {
			if(nextProps.match.params.location && locations[nextProps.match.params.location])
				this.setState({ activeFeature: locations[nextProps.match.params.location], sidebarOpen: true}, () => this.flyToFeature())
			else
				this.setState({ activeFeature: null, sidebarOpen: false }, () => this.flyToDefault())
		}
	}

	_onHover = event => {

		const { hoveredBuildingid } = this.state

		if(this.state.sidebarOpen && event.center.x > 0.7 * window.innerWidth) {
			if(this.state.hoveredFeature)
				this.setState({ hoveredFeature: null })
			return
		}
		let hoverInfo = null;
		let buildingName = '';
		const {
			features,
			srcEvent: { offsetX, offsetY },
		} = event;

		const hoveredFeature = features && features.find(f => f.layer.id === 'building-fills');
		// console.log(event.features)

		this.setState({ hoveredFeature });
		
		var hoveredBuildingidset = null;

		// const building = event.features[0]
		if(hoveredFeature){

			var hoveredStateid = null;
			// console.log(hoveredFeature);
			// console.log(event)
			// buildingName = event.features[0].properties.title;
			hoverInfo = event.lngLat;
			this.setState({ hoverInfo });
			// console.log(event.features[0].id)
			// hoveredBuildingid = event.features[0].id;

			if (event.features.length > 0) {
				if (hoveredBuildingid) {
					map.setFeatureState({ source: 'buildings', id: hoveredBuildingid }, { hover: false });
				}
				hoveredBuildingidset = parseInt(event.features[0].id);
				this.setState({hoveredBuildingid: hoveredBuildingidset})
				console.log('it works')
				map.setFeatureState({ source: 'buildings', id: hoveredBuildingid }, { hover: true });
			}
			
		}

	};

	_onMouseMove = event => {

		const { hoveredBuildingid , hoveredFeature} = this.state
		if(!hoveredFeature){
			if (hoveredBuildingid) {
				map.setFeatureState({ source: 'buildings', id: hoveredBuildingid }, { hover: false });
			}
			// hoveredBuildingid = null;
			this.setState({ hoveredBuildingid: null })
		}
	}

	_renderPopup() {
		const { hoverInfo, hoveredFeature } = this.state;
		if (hoverInfo && hoveredFeature) {
			return (
				<Popup longitude={Object.values(hoverInfo)[0]} latitude={Object.values(hoverInfo)[1]} closeButton={false}>
					<h4 className="building info-window">{hoveredFeature.properties.title}</h4>
				</Popup>
			);
		}
		return null;
	}

	_onClick = event => {

		if(this.state.sidebarOpen && event.center.x > 0.7 * window.innerWidth) return;

        // const { hoverInfo } = this.state;
		const {
			features,
			srcEvent: { offsetX, offsetY },
		} = event;

		// Find clicked building
        const clickedFeature = features && features.find(f => f.layer.id === 'building-fills');
        
		if(clickedFeature) {
			// If clicked on building, link to that building
            let buildingData = this.state.locations.find(loc => loc.label === clickedFeature.properties.title) || "";
            this.props.history.push('/map/' + buildingData.value)
		} else {
			this.props.history.push('/map')
        }
        console.log(this.props)
        
	}
	
	flyToFeature() {

		if(this.state.activeFeature) {

			// Get Centerpoint
			let centerpoint = polylabel(buildings.features.find(f => f.properties.title === this.state.activeFeature.label).geometry.coordinates, 1.0)
			if(!centerpoint[0] || !centerpoint[1]) {
				console.log("Can't find centerpoint!")
				console.log("Centerpoint:", centerpoint)
				return
			}

			// Fly to Centerpoint
            var newViewport = {
                width: window.innerWidth,
                height: window.innerHeight - 64,
                latitude: centerpoint[1],
                longitude: centerpoint[0],
                zoom: 17,
                transitionDuration: 2000,
                transitionInterpolator: new FlyToInterpolator(),
            }
			this.setState({ viewport: newViewport });
			
		}

	}

	flyToDefault() {

		// Fly to default
		var newViewport = {
			width: window.innerWidth, 
			height: window.innerHeight - 64,
			latitude: 33.585509,
			longitude: -101.882083,
			zoom: 14.5,
			transitionDuration: 2000,
			transitionInterpolator: new FlyToInterpolator(),
		}
		this.setState({ viewport: newViewport });

	}

	render() {
		return (
			<Fragment>
				<Select
					id="MapSelect"
					options={this.state.locations}
					defaultValue={this.props.match.params.location ? 
						locations[Object.keys(locations).find(key => key.toLowerCase() === this.props.match.params.location.toLowerCase())] || null
					: null}
					value={this.state.activeFeature}
					filterOption={(option, searchText) => {
						console.log(option)
						if( option.label.toLowerCase().includes(searchText.toLowerCase()) ||
							option.value.toLowerCase().includes(searchText.toLowerCase()) ||
							option.data.code.includes(searchText) ||
							option.data.tags.some(tag => tag.includes(searchText.toLowerCase())) ) 
							return true 
						else 
							return false
					}}
					formatOptionLabel={({ value, label, code }) => (
						<Link to={'/map/' + value}>
							<div style={{ display: "flex", color: "#353535" }}>
								<div>{label}</div>
								{code ? 
									<div style={{ marginLeft: "8px"}}>
										<Chip 
											variant='outlined' 
											label={code}
											size='small'
										/>
									</div>
								: ""}
							</div>
						</Link>
					)}
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
					onMouseMove={this._onMouseMove}
				>
				{/* <Source type="geojson" data={buildings}> */}
					{/* <Layer {...this.state.styleOutline} />
					<Layer {...this.state.styleFill}/> */}
				{/* </Source> */}
				{this._renderPopup()}
				<Panel
					data={this.state.activeFeature}
					open={this.state.sidebarOpen}
				/>
				</ReactMapGL>
			</Fragment>
		)
	}
}

export default withRouter(Map)