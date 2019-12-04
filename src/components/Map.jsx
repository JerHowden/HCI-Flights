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

			hoveredFeature: null,
			hoveredBuildingid: null,
			hoverInfo: null,
			activeFeature: locations[this.props.match.params.location],
			sidebarOpen: !!locations[this.props.match.params.location],

			locations: [],

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
			//source from buildings.json
			map.addSource('buildings', {
				'type': 'geojson',
				'data': buildings
			})
			
			//fill of each building
			map.addLayer({
				"id": 'building-fills',
				'type': 'fill',
				'source': 'buildings',
				'layout': {},
				"paint": {
					"fill-color": "#627BC1",
					// "fill-color": "#991b1b",
					"fill-opacity": ["case",
						["boolean", ["feature-state", "hover"], false],
						1,
						0.5
					]
				}
			})
			//outline of each building
			map.addLayer({
				"id": 'building-borders',
				'type': 'line',
				'source': 'buildings',
				'layout': {},
				'paint': {
					'line-color': '#627BC1',
					// 'line-color': '#991b1b',
					'line-width': 2
				}
			})

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

		const { hoveredBuildingid, hoveredFeature, sidebarOpen } = this.state

		//something with the sidebar idk
		if(sidebarOpen && event.center.x > 0.7 * window.innerWidth) {
			if(hoveredFeature)
				this.setState({ hoveredFeature: null })
			return
		}

		const {
			features,
			srcEvent: { offsetX, offsetY },
		} = event;

		// assigns the building that is underneath the cursor. If there is one.
		this.setState({ hoveredFeature: features && features.find(f => f.layer.id === 'building-fills')});

		//if the mouse is over a building, then turn the building's opacity to 1
		if(hoveredFeature){

			//used for rendering the popup if the mouse is over a building
			this.setState({ hoverInfo: event.lngLat });

			if (event.features.length > 0) {
				if (hoveredBuildingid) {
					map.setFeatureState({ source: 'buildings', id: hoveredBuildingid }, { hover: false });
				}
				this.setState({hoveredBuildingid: event.features[0].id})
				map.setFeatureState({ source: 'buildings', id: hoveredBuildingid }, { hover: true });
			}
			
		}

	};

	_onMouseMove = event => {

		const { hoveredBuildingid , hoveredFeature} = this.state

		//if the mouse isn't over a building then turn the building back to its original opacity
		if(!hoveredFeature){
			if (hoveredBuildingid) {
				map.setFeatureState({ source: 'buildings', id: hoveredBuildingid }, { hover: false });
			}
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