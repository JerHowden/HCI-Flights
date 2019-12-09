import React, { Component } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

import Main from './components/Main'
import CalendarPage from './components/CalendarPage'
import Map from './components/Map'
import Resources from './components/Resources'
import Navigation from './components/Navigation'
import './App.css';

class App extends Component {

	constructor(props) {
		super(props)

		this.fade = this.fade.bind(this)

		this.state = {
			fadeIn: false
		}
	}

	fade() {
		this.setState({ fadeIn: true })
	}

	componentDidMount() {
		library.add(fab, fas, far)
	}

	render() {
		return (
			<div className="App">
				<Router basename={process.env.PUBLIC_URL}>
					<Navigation fadeIn={this.state.fadeIn} />
					<Switch>
						<Route exact path='/' render={props => <Main {...props} fadeIn={this.state.fadeIn} fade={this.fade}/>} />
						<Route path='/map/:location?' render={props => <Map {...props}/>} />
						<Route path='/calendar/:filter?' render={props => <CalendarPage {...props}/>} />
						<Route path='/resources/:category?' render={props => <Resources {...props}/>} />
					</Switch>
				</Router>
			</div>
		)
	}
}

export default App;
