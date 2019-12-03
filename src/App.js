import React from 'react';

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

function App() {

	library.add(fab, fas, far)

	return (
		<div className="App">
			<Router basename={process.env.PUBLIC_URL}>
				<Navigation/>
				<Switch>
					<Route exact path='/' render={props => <Main {...props}/>} />
					<Route path='/map/:location?' render={props => <Map {...props}/>} />
					<Route path='/calendar/:filter?' render={props => <CalendarPage {...props}/>} />
					<Route path='/resources' render={props => <Resources {...props}/>} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
